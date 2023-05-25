import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css'],
})
export class AddOrderComponent implements OnInit {
  addOrderForm$: Observable<InputBase<string>[]>;

  products!: object[][];

  constructor(
    private formService: FormService,
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {
    this.addOrderForm$ = formService.addOrderForm();

    const response = this.route.snapshot.data['productsResolver'];
    this.products = [...response.products];
  }

  ngOnInit(): void {
    console.log(this.products);
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
    console.log('AddOrderScreen Submit: ', data);

    const orderObj = {
      address_id: data.addressId,
      coupon_id: data.couponId,
      id: '',
      payment_status: data.paymentState,
      products: data.orderId,
      status: data.state,
      transaction: data.transaction,
      user_id: data.userId,
    };

    console.log('orderObj : ', orderObj);

    this.orderService
      .postNewOrder(orderObj)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['dashboard/orders']);
          }, 1600);
        })
      )
      .subscribe({
        next: () => {
          console.log('order added successfully');
          this.notify('Success', true);
        },
        error: (err) => {
          this.notify('Something went wrong', false);
        },
      });
  }
}
