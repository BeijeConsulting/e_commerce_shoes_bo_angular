import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  baseURL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseURL = this.authService.baseURL;
  }

  getCategories(lang: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/categories/${lang}`,
      this.authService.getHeaderOptions(true)
    );
  }
}
