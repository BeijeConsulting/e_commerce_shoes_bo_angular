import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/UserLogin';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'https://shoes-api.beije.it';
  token: BehaviorSubject<string> = new BehaviorSubject<string>(
    this.storageService.getStorage('token')
  );

  constructor(
    private http: HttpClient,
    private storageService: StorageService
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
    return this.http.post<any>(
      `${this.baseURL}/signin`,
      body,
      this.getHeaderOptions()
    );
  }

  /* getOrders(): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseURL}/orders/all`,
        this.getHeaderOptions(true)
      );
  } */

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
}
