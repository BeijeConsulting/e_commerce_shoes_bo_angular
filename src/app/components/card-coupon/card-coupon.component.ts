import { Component, Input } from '@angular/core';
import { CouponDataApi } from 'src/app/interfaces/CouponDataApi';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.component.html',
  styleUrls: ['./card-coupon.component.css'],
})
export class CardCouponComponent {
  @Input() coupon!: CouponDataApi;
}
