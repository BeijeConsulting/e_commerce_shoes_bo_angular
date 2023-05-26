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

  addCoupon() {
    this.router.navigate(['cms/coupons/add-coupon']);
  }
}
