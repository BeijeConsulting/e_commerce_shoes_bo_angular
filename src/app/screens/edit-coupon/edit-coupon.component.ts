import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css'],
})
export class EditCouponComponent {
  editCouponForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.editCouponForm$ = formService.editCouponForm({
      code: '2323',
      englishDescription: 'english desription',
      italianDescription: 'italian description',
      expirationDate: '11/01/2024',
      id: '32423',
      maxUsage: '2',
      minOrder: '200',
      type: 'type',
      value: 'value',
      userId: '23432',
    });
  }

  onSubmit(data: any) {
    console.log('EditCouponScreen Submit: ', data);
  }
}
