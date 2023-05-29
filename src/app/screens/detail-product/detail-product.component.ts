import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { NotifyService } from 'src/app/services/notify/notify.service';
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
    private translatePipe: TranslatePipe,
    private notifyService: NotifyService
  ) {
    const response: {
      product: ProductFull;
      productDetails: ProductDetailsFull[];
      productImages: ProductImageFull[];
    } = this.route.snapshot.data['detailProductsResolver'];

    console.log(response.product);

    this.product = { ...response.product };
    this.sizes = [...response.productDetails];
    this.images = [...response.productImages];
  }

  ngOnInit(): void {
    this.notifyService.notify.subscribe((notify: string) => {
      if (notify) {
        switch (notify) {
          case 'added product':
            this.notifyService.showNotify(
              this.translatePipe.transform('addedProduct'),
              true
            );
            break;
          case 'updated product':
            this.notifyService.showNotify(
              this.translatePipe.transform('updatedProduct'),
              true
            );
            break;
          case 'something went wrong':
            this.notifyService.showNotify(
              this.translatePipe.transform('errorTryAgain'),
              false
            );
            break;
        }
        this.notifyService.notify.next('');
      }
    });
  }

  goToEditProduct(): void {
    this.router.navigate([`cms/products/edit-product/${this.product.id}`]);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        message: 'confirmItemDeletion',
        item: this.product.name,
      },
    });
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.deleteProduct();
    });
  }

  deleteProduct(): void {
    this.productService.deleteSingleProduct(this.product.id).subscribe({
      next: () => {
        this.notifyService.notify.next('deleted product');
        this.router.navigate(['cms/products']);
      },
      error: () => {
        this.notifyService.showNotify(
          this.translatePipe.transform('errorTryAgain'),
          false
        );
      },
    });
  }
}
