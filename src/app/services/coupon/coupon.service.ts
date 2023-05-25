import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CouponDataResponseApi } from 'src/app/interfaces/CouponDataApi';
import { CouponDataApi } from 'src/app/interfaces/CouponDataApi';

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

  getCouponById(id: number): Observable<any> {
    return this.http.get(
      `${this.baseURL}/coupons/search_coupon/id=${id}`,
      this.authService.getHeaderOptions(true)
    );
  }

  addCoupon(coupon: any): Observable<any> {
    return this.http.post<any>(
      `${this.authService.baseURL}/coupons/create_coupon`,
      coupon,
      {
        headers: this.authService.getHeaderOptions(true).headers,
        responseType: 'text' as 'json',
      }
    );
  }

  deleteCoupon(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.authService.baseURL}/coupons/disable_coupon?idcoup=${id}`,
      {
        headers: this.authService.getHeaderOptions(true).headers,
        responseType: 'text' as 'json',
      }
    );
  }

  editCoupon(newCoupon: any): Observable<any> {
    return this.http.put<any>(
      `${this.authService.baseURL}/coupons/modify_coupon`,
      newCoupon,
      {
        headers: this.authService.getHeaderOptions(true).headers,
        responseType: 'text' as 'json',
      }
    );
  }
}
