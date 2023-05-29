import {
  HttpErrorResponse,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { switchMap, catchError, throwError, Observable, of } from 'rxjs';
import { StorageService } from './services/storage/storage.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthService } from './services/auth/auth.service';
import { OrderService } from './services/order/order.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { NotifyService } from './services/notify/notify.service';

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
    private authService: AuthService,
    private orderService: OrderService,
    private router: Router,
    private location: Location
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): any {
    const errorService = inject(NotifyService);

    if (request.headers.get('Authorization')) {
      console.log('chiamata autenticata');

      return next.handle(request).pipe(
        catchError((err) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            console.log('401 entrato');
            return this.handle401Error(request, next);
          } else {
            console.log('error', err);
            return err;
          }
        })
      );
    }
    return next.handle(request);
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
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      return this.authService.refreshToken().pipe(
        switchMap((res) => {
          console.log('nuovo refresh token');
          this.isRefreshing = false;
          const newToken: string = res.token;

          this.storageService.setStorage('refreshToken', res.refreshToken);
          this.storageService.setStorage('token', newToken);
          this.authService.token.next(newToken);
          return next.handle(this.addToken(request, newToken));
        }),
        catchError((err) => {
          console.log('CATCH ERROR REFRESH TOKEN');
          return this.authService.logout();
        })
      );
    }
    // return next.handle(request);
    return throwError(() => new Error('ERROR: Failed refresh Token'));
  }
}

export const interceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: InterceptorProvider,
  multi: true,
};
