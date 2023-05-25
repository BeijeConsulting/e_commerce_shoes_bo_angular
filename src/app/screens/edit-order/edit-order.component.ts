import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { orderItem } from 'src/app/interfaces/Order';
import { FormService } from 'src/app/services/form/form.service';
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
    private snackBar: MatSnackBar
  ) {
    this.orderDetail = this.route.snapshot.data['ordersResolver'];
    console.log('this.orderDetail', this.orderDetail);

    this.editOrderForm$ = formService.editOrderForm({
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

  notify(message: string, success: boolean) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500,
      panelClass: success ? 'snackbar-success' : 'snackbar-error',
    };
    return this.snackBar.open(message, '', snackBarConfig);
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
            this.router.navigate(['dashboard/orders']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notify('Order Edited', true);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went wrong', false);
        },
      });
  }
}
