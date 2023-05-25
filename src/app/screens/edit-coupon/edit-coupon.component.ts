import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { CouponDataApi } from 'src/app/interfaces/CouponDataApi';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-coupon',
  templateUrl: './edit-coupon.component.html',
  styleUrls: ['./edit-coupon.component.css'],
})
export class EditCouponComponent {
  editCouponForm$: Observable<InputBase<string>[]>;
  coupon: CouponDataApi;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private couponService: CouponService
  ) {
    this.coupon = route.snapshot.data['couponEditDetailsResolver'][0];
    this;
    console.log('this.coupon', this.coupon);

    this.editCouponForm$ = formService.editCouponForm({
      code: this.coupon.code,
      englishDescription: this.coupon.description_eng,
      italianDescription: this.coupon.description_it,
      expirationDate: this.coupon.expire_date,
      id: String(this.coupon.id),
      maxUsage: String(this.coupon.max_usages),
      minOrder: String(this.coupon.min_order),
      type: this.coupon.type,
      value: String(this.coupon.value),
      userId: this.coupon.user_id ? String(this.coupon.user_id) : '',
    });
  }

  onSubmit(data: any) {
    const dataAdapt = {
      code: data.code,
      description_eng: data.englishDescription,
      description_it: data.italianDescription,
      expire_date: this.datePipe.transform(data.expirationDate, 'YYYY-MM-dd'),
      id: this.coupon.id,
      max_usages: data.maxUsage,
      min_order: data.minOrder,
      type: data.type,
      user_id: data.userId,
      value: data.value,
    };
    console.log('EditCouponScreen Submit: ', data);
    console.log('EditCouponScreen Submit: ', dataAdapt);
    console.log('EditCouponScreen Submit: ', this.coupon);

    this.couponService
      .editCoupon(dataAdapt)
      .pipe(
        finalize(() => {
          this.router.navigate(['/dashboard/coupons']);
        })
      )
      .subscribe({
        next: (response) => console.log(response),
        error: () => {},
      });
  }
}
/*
{
  "id": "38",
  "code": "TESTTOAST", V
  "max_usages": "2", V
  "user_id": "", V
  "expire_date": "2222-02-02", V
  "type": "w", V
  "value": "2", V
  "min_order": "2", V
  "description_it": "dfgfdg", V
  "description_eng": "dfgdfgdf" V
}
*/
