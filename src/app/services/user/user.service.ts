import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import {
  UserDataApi,
  UserDataResponseApi,
} from 'src/app/interfaces/UserDataApi';
import { AddNewUser } from 'src/app/interfaces/AddNewUser';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseURL: string = this.authService.baseURL;

  usersResponse$ = new BehaviorSubject<UserDataResponseApi | null>(null);
  employeeResponse$ = new BehaviorSubject<UserDataResponseApi | null>(null);

  constructor(private authService: AuthService, private http: HttpClient) {}

  getUsers(
    page: number,
    size: number,
    isEmployee: boolean = false
  ): Observable<any> {
    return this.http
      .get<any>(
        `${this.baseURL}/search/page=${page}/size=${size}${
          isEmployee ? '?staff=true' : ''
        }`,
        this.authService.getHeaderOptions(true)
      )
      .pipe(
        tap((data) => {
          if (!isEmployee) this.usersResponse$.next(data);
          if (isEmployee) this.employeeResponse$.next(data);
        })
      );
  }

  addUser(newUser: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/admin/user`,
      newUser,
      this.authService.getHeaderOptions(true)
    );
  }

  editUser(id: number, newData: any): Observable<any> {
    return this.http.put<any>(
      `${this.baseURL}/admin/user/${id}`,
      newData,
      this.authService.getHeaderOptions(true)
    );
  }
}
