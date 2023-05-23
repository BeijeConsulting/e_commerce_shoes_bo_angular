import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ProductService } from '../../services/product/product.service';
<<<<<<< HEAD
import { CouponService } from 'src/app/services/coupon/coupon.service';
=======
import { OrderService } from 'src/app/services/order/order.service';
>>>>>>> develop

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
<<<<<<< HEAD
    private userService: UserService,
    private productService: ProductService,
    private couponService: CouponService
=======
    private orderService: OrderService,
    private productService: ProductService,
    private userService: UserService
>>>>>>> develop
  ) {}

  ngOnInit(): void {
    console.log('data dialog', this.data);
  }

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  onDelete() {
    // Orders
    if (this.data.hasOwnProperty('orderId')) {
      this.orderService.deleteSingleOrder(this.data.orderId).subscribe({
        next: (res) => console.log('res', res),
        error: (err) => {
          if (err.error.text === 'deleted') {
            console.log('deleted err.error.text');
          }
        },
      });
      this.closeDialog();
      console.log('delete order');
    }

    // User
    if (this.data.hasOwnProperty('userId')) {
      console.log(this.data);
      console.log('users table state:', this.userService.userTableDataState);
      console.log(
        'employees table state:',
        this.userService.employeesTableDataState
      );

      const userTableState = this.userService.userTableDataState;
      const employeesTableState = this.userService.employeesTableDataState;

      this.userService
        .deleteUser(this.data.userId)
        .pipe(
          switchMap(() => {
            return forkJoin({
              users: this.userService.getUsers(
                userTableState.page,
                userTableState.size,
                false
              ),
              employees: this.userService.getUsers(
                employeesTableState.page,
                employeesTableState.size,
                true
              ),
            });
          }),
          finalize(() => {
            this.closeDialog();
          })
        )
        .subscribe({
          next: () => console.log('User Deleted'),
          error: (err) => console.log(err),
        });
    }

<<<<<<< HEAD
    if (this.data.hasOwnProperty('couponId')) {
      const couponTableState = this.couponService.couponTableDataState;

      this.couponService
        .deleteCoupon(this.data.couponId)
        .pipe(
          finalize(() => {
            this.closeDialog();
            this.couponService
              .getCoupons(couponTableState.page, couponTableState.size)
              .subscribe({
                next: () => console.log('Table Updated'),
              });
          })
        )
        .subscribe({
          next: () => console.log('Coupon deleted'),
          error: () => {},
        });
    }

    // this.productService
    //   .deleteSingleProduct(this.data.id)
    //   .subscribe(() => this.productService.getProducts(1, 5, 'it'));

    // this.closeDialog();
=======
    // Product
    if (this.data.hasOwnProperty('productId')) {
      this.productService
        .deleteSingleProduct(this.data.productId)
        .subscribe(() => this.productService.getProducts(1, 5, 'it'));
      this.closeDialog();
    }
>>>>>>> develop
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }
}
