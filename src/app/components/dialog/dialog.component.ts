import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  onDelete() {
    this.productService
      .deleteSingleProduct(this.data.id)
      .subscribe(() => this.productService.getProducts(1, 5, 'it'));

    this.closeDialog();
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }
}
