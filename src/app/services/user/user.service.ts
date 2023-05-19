import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = this.authService.baseURL;

  constructor(private authService: AuthService, private http: HttpClient) {}

  getUsers(page: number, size: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/search/page=${page}/size=${size}`,
      this.authService.getHeaderOptions(true)
    );
  }
}
