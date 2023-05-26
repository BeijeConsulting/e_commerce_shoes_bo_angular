import { Component, OnInit } from '@angular/core';

// Router
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ProductService } from 'src/app/services/product/product.service';

import { ProductPreview } from 'src/app/interfaces/Product';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { NotifyService } from 'src/app/services/notify/notify.service';
// Pipes
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: ProductPreview[];
  productsLength: number;
  page: number = 1;
  perPage: number = 5;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private translate: TranslateService,
    private notifyService: NotifyService,
    private snackBar: MatSnackBar,
    private translatePipe: TranslatePipe
  ) {
    const response = this.route.snapshot.data['productsResolver'];
    this.products = [...response.products];
    this.productsLength = response.results;
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((res) =>
      this.productService.getProducts(this.page, this.perPage, res.lang)
    );

    this.productService.products.subscribe((res) => {
      this.products = [...res.products];
      this.productsLength = res.results;
    });

    this.notifyService.notify.subscribe((notify: string) => {
      if (notify) {
        switch (notify) {
          case 'product not found':
            this.notify('productNotFound', false);
            break;
          case 'something went wrong':
            this.notify('errorTryAgain', false);
            break;
          case 'deleted product':
            this.notify('deletedProduct', true);
            break;
        }
        this.notifyService.notify.next('');
      }
    });
  }

  addProduct() {
    this.router.navigate(['cms/products/add-product']);
  }

  getPaginatedProducts(e: PageEvent) {
    this.isLoading = true;
    this.page = e.pageIndex + 1;
    this.perPage = e.pageSize;
    const language = this.translate.currentLang;
    this.productService
      .getProducts(this.page, this.perPage, language)
      .subscribe({
        next: () => {
          this.isLoading = false;
        },
      });
  }

  notify(message: string, success: boolean) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 2500,
      panelClass: success ? 'snackbar-success' : 'snackbar-error',
    };
    return this.snackBar.open(
      this.translatePipe.transform(message),
      '',
      snackBarConfig
    );
  }
}
