import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ProductService } from '../../services/product/product.service';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { OrderService } from 'src/app/services/order/order.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
    private userService: UserService,
    private productService: ProductService,
    private couponService: CouponService,
    private orderService: OrderService,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    console.log('data dialog', this.data);
  }

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  denyAction(): void {
    this.matDialogRef.close(false);
  }

  confirmAction(): void {
    this.matDialogRef.close(true);
  }

  onDelete() {
    // Product
    if (this.data.hasOwnProperty('productId')) {
      const language: string = this.translate.currentLang;
      this.productService
        .deleteSingleProduct(this.data.productId)
        .subscribe(() => this.productService.getProducts(1, 5, language));
      this.closeDialog();
    }
  }
}
