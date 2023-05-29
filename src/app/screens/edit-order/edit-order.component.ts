import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.component.html',
  styleUrls: ['./edit-order.component.css'],
})
export class EditOrderComponent {
  editOrderForm$: Observable<InputBase<string>[]>;

  orderDetail!: {
    products: object[];
    address: string;
    created_at: string;
    id: number;
    payment_status: string;
    status: string;
    total_price: number;
    transaction: string;
    transaction_date: string;
    user_id: number;
  };

  constructor(
    private formService: FormService,
    private orderService: OrderService,
    private route: ActivatedRoute,
    private router: Router,
    private notifyService: NotifyService,
    private translatePipe: TranslatePipe
  ) {
    this.orderDetail = this.route.snapshot.data['ordersResolver'];
    console.log('this.orderDetail', this.orderDetail);

    this.editOrderForm$ = this.formService.editOrderForm({
      address: this.orderDetail.address,
      created_at: this.orderDetail.created_at,
      id: this.orderDetail.id,
      payment_status: this.orderDetail.payment_status,
      status: this.orderDetail.status,
      total_price: this.orderDetail.total_price,
      transaction: this.orderDetail.transaction,
      transaction_date: this.orderDetail.transaction_date,
      user_id: this.orderDetail.user_id,
    });
  }

  onSubmit(data: any) {
    // console.log('EditOrderScreen Submit: ', data);
    const arrayId: number[] = [];
    this.orderDetail.products.map((el: any) => {
      console.log('el.product_id', el.product_id);
      arrayId.push(el.product_id);
    });

    console.log('arrayId', arrayId);

    const newOrder = {
      // address_id: 130,
      coupon_id: '',
      id: this.orderDetail.id,
      payment_status: this.orderDetail.payment_status,
      status: data.state,
      products: arrayId,
      transaction: this.orderDetail.transaction,
      user_id: this.orderDetail.user_id,
    };
    console.log('newOrder: ', newOrder);

    this.orderService
      .editOrder(newOrder)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['cms/orders']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notifyService.showNotify(
            this.translatePipe.transform('orderEdited'),
            true
          );
        },
        error: (err) => {
          console.log(err);
          this.notifyService.showNotify(
            this.translatePipe.transform('somethingWentWrong'),
            false
          );
        },
      });
  }
}
