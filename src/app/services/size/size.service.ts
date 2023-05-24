import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class SizeService {
  baseURL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseURL = this.authService.baseURL;
  }

  getSizes(): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/sizes`,
      this.authService.getHeaderOptions(true)
    );
  }
}
