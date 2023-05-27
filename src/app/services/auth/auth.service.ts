import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, finalize, of, tap } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/UserLogin';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'https://shoes-api.beije.it';
  token: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.storageService.getStorage('token')
  );

  isLogged: boolean = false;
  userRole?: string[];

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {}

  getHeaderOptions(isAuth: boolean = false): { headers: HttpHeaders } {
    if (isAuth) {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Acces-Control-Allow-Origin': '*',
          Authorization: `Bearer ${this.token.value}`,
        }),
      };
    } else {
      return {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Acces-Control-Allow-Origin': '*',
        }),
      };
    }
  }

  login(body: UserLogin): Observable<any> {
    return this.http
      .post<any>(`${this.baseURL}/signin`, body, this.getHeaderOptions())
      .pipe(
        tap((resp) => {
          console.log('tap', resp);
          this.isLogged = true;

          this.storageService.setStorage<string>('token', resp.token);
          this.storageService.setStorage<string>(
            'refreshToken',
            resp.refreshToken
          );
          this.storageService.setStorage<string[]>(
            'permissions',
            resp.permission
          );

          this.token.next(resp.token);

          this.userRole = resp.permission;
        })
      );
  }

  refreshToken(): Observable<any> {
    console.log('inizio refresh token');
    const refreshToken = this.storageService.getStorage('refreshToken');
    return this.http.post<any>(
      `${this.baseURL}/refresh_token`,
      {
        refreshToken: refreshToken,
      },
      this.getHeaderOptions()
    );
  }

  logout(): Observable<any> {
    const refreshToken: string | null | undefined =
      this.storageService.getStorage('refreshToken');

    if (refreshToken) {
      return this.http
        .post<any>(
          `${this.baseURL}/sign_out`,
          {
            refreshToken: refreshToken,
          },
          this.getHeaderOptions(true)
        )
        .pipe(
          finalize(() => {
            const currentLang: string =
              this.storageService.getStorage('language');
            this.storageService.clear();
            this.storageService.setStorage<string>('language', currentLang);
            this.token.next('');
            this.isLogged = false;
            this.router.navigate(['login']);
          })
        );
    }

    return of('LOGGED OUT').pipe(
      finalize(() => {
        this.storageService.clear();
        this.token.next('');
      })
    );
  }
}
