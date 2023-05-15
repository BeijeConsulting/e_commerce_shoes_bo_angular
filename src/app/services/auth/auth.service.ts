import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserLogin } from 'src/app/interfaces/UserLogin';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'https://shoes-api.beije.it';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Acces-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {}

  login(body: UserLogin): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/signin`,
      body,
      this.httpOptions
    );
  }
}
