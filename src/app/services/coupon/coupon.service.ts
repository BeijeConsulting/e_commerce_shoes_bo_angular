import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CouponDataResponseApi } from 'src/app/interfaces/CouponDataApi';

@Injectable({
  providedIn: 'root',
})
export class CouponService {
  baseURL: string = this.authService.baseURL;

  couponResponse$ = new BehaviorSubject<CouponDataResponseApi | null>(null);
  couponTableDataState = { page: 1, size: 10 };

  constructor(private authService: AuthService, private http: HttpClient) {}

  getCoupons(page: number, size: number): Observable<CouponDataResponseApi> {
    return this.http
      .get<any>(
        `${this.baseURL}/coupons/all/page=${page}/size=${size}`,
        this.authService.getHeaderOptions(true)
      )
      .pipe(
        tap((response) => {
          this.couponResponse$.next(response);
        })
      );
  }
}
