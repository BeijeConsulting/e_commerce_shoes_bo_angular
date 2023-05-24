import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ColorService {
  baseURL: string;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.baseURL = this.authService.baseURL;
  }

  getColors(lang: string): Observable<any> {
    return this.http.get<any>(
      `${this.baseURL}/colors/${lang}`,
      this.authService.getHeaderOptions(true)
    );
  }
}
