import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { AuthService } from '../auth/auth.service';

// Rxjs
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseURL: string = this.authService.baseURL;

  constructor(private authService: AuthService, private http: HttpClient) {}

  // GET all orders per page
  getOrdersPerPage(page: number, per_page: number): Observable<any> {
    return this.http.get(
      `${this.baseURL}/orders/all/page=${page}/per_page=${per_page}`,
      this.authService.getHeaderOptions(true)
    );
  }

  // GET order by ID
  getOrderById(id: number): Observable<any> {
    return this.http.get(
      `${this.baseURL}/orders/details/${id}`,
      this.authService.getHeaderOptions(true)
    );
  }
}
