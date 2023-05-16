import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/UserLogin';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'https://shoes-api.beije.it';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Acces-Control-Allow-Origin': '*',
      'interceptor': 'true',
    }),
  };

  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(body: UserLogin): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/signin`,
      body,
      this.httpOptions
    );
  }

  refreshToken(): Observable<any> {
    console.log("inizio refresh token");
    const refreshToken = this.storageService.getStorage('refreshToken');
    return this.http
      .post<any>(
        `${this.baseURL}/refresh_token`,
        {
          refreshToken: refreshToken,
        },
        this.httpOptions
      );
  }
}
