import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  notify: BehaviorSubject<string> = new BehaviorSubject('');

  constructor() {}
}
