import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-coupon',
  templateUrl: './card-coupon.component.html',
  styleUrls: ['./card-coupon.component.css'],
})
export class CardCouponComponent {
  @Input() id: string | number = '';
  @Input() code: string = '';
  @Input() state: string = '';
  @Input() maxUses: string = '';
  @Input() expirationDate: string = '';
  @Input() type: string = '';
  @Input() value: string = '';
  @Input() minOrder: string = '';
  @Input() italianDescription: string = '';
  @Input() englishDescription: string = '';
}
