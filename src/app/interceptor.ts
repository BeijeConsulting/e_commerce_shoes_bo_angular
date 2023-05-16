import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, catchError, throwError } from 'rxjs';
import { StorageService } from './services/storage/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class InterceptorProvider implements HttpInterceptor {
  private isRefreshing: boolean = false;
  baseURL: string = 'https://shoes-api.beije.it';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Acces-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private storageService: StorageService,
    private authService: AuthService
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

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          this.isRefreshing = false;

          this.storageService.setStorage('refreshToken', res.refreshToken);
          this.storageService.setStorage('token', res.token);
          const response = this.addToken(request, res.token);
          console.log("add token",response);
          return next.handle(this.addToken(request, res.token));
        }));
    }

    return next.handle(request);
  }
}

export const interceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true,
};
