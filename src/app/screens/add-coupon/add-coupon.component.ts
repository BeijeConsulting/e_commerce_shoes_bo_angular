import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { FormService } from 'src/app/services/form/form.service';
import { NotifyService } from 'src/app/services/notify/notify.service';

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
    private router: Router,
    private notifyService: NotifyService
  ) {
    this.addCouponForm$ = this.formService.addCouponForm();
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
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['/cms/coupons']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notifyService.showNotify('Success', true);
        },
        error: (err) => {
          console.log('Error', err);
          this.notifyService.showNotify('Something went wrong', false);
        },
      });
  }
}
