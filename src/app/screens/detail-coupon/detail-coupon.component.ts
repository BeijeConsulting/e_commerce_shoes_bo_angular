import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CouponDataApi } from 'src/app/interfaces/CouponDataApi';

@Component({
  selector: 'app-detail-coupon',
  templateUrl: './detail-coupon.component.html',
  styleUrls: ['./detail-coupon.component.css'],
})
export class DetailCouponComponent implements OnInit {
  coupon: CouponDataApi;

  constructor(private route: ActivatedRoute) {
    this.coupon = this.route.snapshot.data['couponsDetailResolver'][0];
  }

  ngOnInit(): void {
    console.log(this.coupon);
  }
}
