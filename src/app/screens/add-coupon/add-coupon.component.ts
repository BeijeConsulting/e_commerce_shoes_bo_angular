import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],
})
export class AddCouponComponent {
  addCouponForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.addCouponForm$ = formService.addCouponForm();
  }

  onSubmit(data: any) {
    console.log('AddCouponScreen Submit: ', data);
  }
}
