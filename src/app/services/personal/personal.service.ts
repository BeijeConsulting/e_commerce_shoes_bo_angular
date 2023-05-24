import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, tap } from 'rxjs';
import { PersonalDataEdit } from 'src/app/interfaces/PersonalData';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class PersonalService {
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  getPersonalData(): Observable<any> {
    return this.http.get<any>(
      `${this.authService.baseURL}/user`,
      this.authService.getHeaderOptions(true)
    );
  }

  getPersonalAddresses(): Observable<any> {
    return this.http.get(
      `${this.authService.baseURL}/user/addresses`,
      this.authService.getHeaderOptions(true)
    );
  }

  editPersonalData(personalData: PersonalDataEdit): Observable<any> {
    return this.http
      .put<any>(
        `${this.authService.baseURL}/user`,
        personalData,
        this.authService.getHeaderOptions(true)
      )
      .pipe(
        switchMap(() => {
          return this.authService.refreshToken().pipe(
            tap((response) => {
              this.storageService.setStorage('token', response.token);
              this.storageService.setStorage(
                'refreshToken',
                response.refreshToken
              );
              this.authService.token.next(response.token);
            })
          );
        })
        // tap((response) => console.log('TAP: ', response))
      );
  }
}
