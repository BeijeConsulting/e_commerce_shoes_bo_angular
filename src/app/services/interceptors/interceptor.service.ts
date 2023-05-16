import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap, catchError, ObservableInput, throwError } from 'rxjs';
import { StorageService } from '../storage/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class InterceptorService {
  private isRefreshing: boolean = false;
  baseURL: string = 'https://shoes-api.beije.it';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Acces-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    if (request.headers.get('interceptor') === 'true') {
      console.log('sono entrato');

      if (this.storageService.getStorage("token")){
        request = this.addToken(request, this.storageService.getStorage("token"));

        return next.handle(request).pipe(
          catchError(err => {
            if (err instanceof HttpErrorResponse && err.status === 401){
              console.log("401 entrato")
              return this.handle401Error(request, next);
            } else {
              return throwError(() => new Error(err));
            }
          })
        )
      }
    }
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

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): any {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      // return this.refreshToken().subscribe(res => console.log("subscribe", res))
      /* pipe(
        tap(),
        switchMap((res) => {
            this.isRefreshing = false;
            this.storageService.setStorage('refreshToken', res.refreshToken);
            this.storageService.setStorage('token', res.token);
            return next.handle(this.addToken(request, res.token));
          })
      ) */
    } else {
      this.isRefreshing = false;
      // return next.handle(this.addToken(request, this.storageService.getStorage('token')));
    }
  }
}

export const interceptorService = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorService,
  multi: true,
};
