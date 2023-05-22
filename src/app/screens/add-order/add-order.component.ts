import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent {
  addOrderForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.addOrderForm$ = formService.addOrderForm();
  }

  onSubmit(data: any) {
    console.log('AddOrderScreen Submit: ', data);

    const idProduct = data.searchProducById.trim().split(',');

    const orderObj = {
      address_id: data.addressId,
      coupon_id: data.couponId,
      id: '',
      payment_status: data.paymentState,
      products: [129, 133],
      status: data.state,
      transaction: data.transaction,
      user_id: data.userId,
    };

    console.log('orderObj : ', orderObj);
  }
}
