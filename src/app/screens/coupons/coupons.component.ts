import { Component } from '@angular/core';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
})
export class CouponsComponent {
  constructor(private router: Router) {}

  addCouon() {
    this.router.navigate(['dashboard/coupons/add-coupon']);
  }
}
