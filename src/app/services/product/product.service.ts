import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products: Subject<any> = new Subject();
  baseURL: string;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.baseURL = this.authService.baseURL;
  }

  getProducts(page: number, perPage: number, lang: string): Observable<any> {
    const result = new Subject();
    this.http
      .get<any>(
        `${this.baseURL}/products/page=${page}/perPage=${perPage}/${lang}`,
        this.authService.getHeaderOptions(true)
      )
      .subscribe((res) => {
        this.products.next(res);
        result.next(res);
      });
    return result.asObservable();
  }

  getSingleProduct(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/products/${id}`,
      this.authService.getHeaderOptions(true)
    );
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/products/add`,
      product,
      this.authService.getHeaderOptions(true)
    );
  }

  updateProduct(product: any, id: number): Observable<any> {
    return this.http.put<any>(
      `${this.baseURL}/products/update/${id}`,
      product,
      this.authService.getHeaderOptions(true)
    );
  }

  addProductDetails(productDetails: any) {
    return this.http.post<any>(
      `${this.baseURL}/product_details/add`,
      productDetails,
      this.authService.getHeaderOptions(true)
    );
  }

  updateProductDetails(productDetails: any, id: number) {
    return this.http.put<any>(
      `${this.baseURL}/product_details/update/${id}`,
      productDetails,
      this.authService.getHeaderOptions(true)
    );
  }

  deleteProductSize(id: number) {
    return this.http.delete<any>(
      `${this.baseURL}/product_details/delete/${id}`,
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
