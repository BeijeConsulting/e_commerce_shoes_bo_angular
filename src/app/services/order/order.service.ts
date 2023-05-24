import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Services
import { AuthService } from '../auth/auth.service';

// Rxjs
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  orders: Subject<any> = new Subject();
  baseURL: string = this.authService.baseURL;

  constructor(private authService: AuthService, private http: HttpClient) {}

  // GET all orders per page
  getOrdersPerPage(page: number, per_page: number): Observable<any> {
    const result = new Subject();
    this.http
      .get<any>(
        `${this.baseURL}/orders/all/page=${page}/per_page=${per_page}`,
        this.authService.getHeaderOptions(true)
      )
      .subscribe((res) => {
        this.orders.next(res);
        result.next(res);
      });
    return result.asObservable();
  }

  // GET order by ID
  getOrderById(id: number): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/orders/details/${id}`,
      this.authService.getHeaderOptions(true)
    );
  }

  // DELETE order by ID
  deleteSingleOrder(id: number): Observable<any> {
    return this.http.delete<any>(
      `${this.baseURL}/orders/delete_order/${id}`,
      this.authService.getHeaderOptions(true)
    );
  }

  // POST new order
  postNewOrder(body: any): Observable<any> {
    return this.http.post<any>(
      `${this.baseURL}/orders/add_order`,
      body,
      this.authService.getHeaderOptions(true)
    );
  }
}
