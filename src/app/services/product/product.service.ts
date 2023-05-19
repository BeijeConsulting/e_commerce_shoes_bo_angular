import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  baseURL: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.baseURL = this.authService.baseURL;
  }

  getProducts(page: number, perPage: number, lang: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/products/page=${page}/perPage=${perPage}/${lang}`,
      this.authService.getHeaderOptions(true)
    );
  }

  getSingleProduct(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/products/${id}`,
      this.authService.getHeaderOptions(true)
    );
  }

  deleteSingleProduct(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseURL}/products/delete/${id}`,
      this.authService.getHeaderOptions(true)
    );
  }
}
