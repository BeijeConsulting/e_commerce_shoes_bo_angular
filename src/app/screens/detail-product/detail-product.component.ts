import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product/product.service';
// Pipes
import { TranslatePipe } from '@ngx-translate/core';
// Interfaces
import {
  ProductFull,
  ProductDetailsFull,
  ProductImageFull,
} from 'src/app/interfaces/Product';
// Dialog
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
// MatSnackBar
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent implements OnInit {
  product: ProductFull;
  sizes: ProductDetailsFull[];
  images: ProductImageFull[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private productService: ProductService,
    private snackBar: MatSnackBar,
    private translatePipe: TranslatePipe,
    private notifyService: NotifyService
  ) {
    const response: {
      product: ProductFull;
      productDetails: ProductDetailsFull[];
      productImages: ProductImageFull[];
    } = this.route.snapshot.data['detailProductsResolver'];

    this.product = { ...response.product };
    this.sizes = [...response.productDetails];
    this.images = [...response.productImages];
  }

  ngOnInit(): void {
    this.notifyService.notify.subscribe((notify: string) => {
      if (notify === 'added product') {
        this.notify('addedProduct', true);
        this.notifyService.notify.next('');
      }
    });
  }

  goToEditProduct(): void {
    this.router.navigate([
      `dashboard/products/edit-product/${this.product.id}`,
    ]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        item: 'product',
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.deleteProduct();
    });
  }

  notify(message: string, success: boolean) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500,
      panelClass: success ? 'snackbar-success' : 'snackbar-error',
    };
    return this.snackBar.open(
      this.translatePipe.transform(message),
      '',
      snackBarConfig
    );
  }

  deleteProduct(): void {
    this.productService.deleteSingleProduct(this.product.id).subscribe({
      next: () => {
        this.notifyService.notify.next('deleted product');
        this.router.navigate(['dashboard/products']);
      },
      error: (err) => {
        this.notify('errorTryAgain', false);
      },
    });
  }
}
