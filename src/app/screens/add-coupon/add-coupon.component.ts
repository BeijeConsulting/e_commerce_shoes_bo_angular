import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { DataCoupon } from 'src/app/interfaces/CouponData';
import { CouponDataApi } from 'src/app/interfaces/CouponDataApi';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-coupon',
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.css'],
})
export class AddCouponComponent {
  addCouponForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private couponService: CouponService,
    private router: Router
  ) {
    this.addCouponForm$ = formService.addCouponForm();
  }

  onSubmit(data: any) {
    console.log('AddCouponScreen Submit: ', data);

    const dataAdapt = {
      code: data.code,
      description_eng: data.englishDescription,
      expire_date: data.expirationDate.format('YYYY-MM-DD'),
      description_it: data.italianDescription,
      max_usages: Number(data.maxUsage),
      min_order: Number(data.minOrder),
      type: data.type,
      user_id: Number(data.userId),
      value: Number(data.value),
    };

    console.log('data adapt: ', dataAdapt);

    this.couponService
      .addCoupon(dataAdapt)
      .pipe(finalize(() => this.router.navigate(['/dashboard/coupons'])))
      .subscribe({
        next: (response) => console.log(response),
        error: () => {},
      });
  }
}
