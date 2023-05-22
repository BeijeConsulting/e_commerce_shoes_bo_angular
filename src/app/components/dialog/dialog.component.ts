import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product/product.service';
import { OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
    private productService: ProductService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    console.log('data dialog', this.data);
  }

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  onDelete() {
    if (this.data.handleFn === 'orderDelete') {
      this.orderService.deleteSingleOrder(this.data.id).subscribe({
        next: (res) => console.log('res', res),
        error: (err) => {
          if (err.error.text === 'deleted') {
            // console.log('deleted');
            this.orderService.getOrdersPerPage(1, 5);
          }
        },
      });
      console.log('DELETE');
    }

    this.productService
      .deleteSingleProduct(this.data.id)
      .subscribe(() => this.productService.getProducts(1, 5, 'it'));

    this.closeDialog();
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }
}
