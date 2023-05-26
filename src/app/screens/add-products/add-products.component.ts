import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable, forkJoin } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { CategoryService } from 'src/app/services/category/category.service';
import { ColorService } from 'src/app/services/color/color.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { FormService } from 'src/app/services/form/form.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent implements OnInit {
  addProductForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private translate: TranslateService,
    private colorService: ColorService,
    private categoryService: CategoryService,
    private snackBar: MatSnackBar,
    private notifyService: NotifyService
  ) {
    const { sizes, colors, categories, brands } =
      this.route.snapshot.data['addProductsResolver'];

    this.addProductForm$ = this.formService.addProductForm(
      sizes,
      brands,
      colors,
      categories
    );
  }

  ngOnInit(): void {
    const { sizes, brands } = this.route.snapshot.data['addProductsResolver'];

    this.translate.onLangChange.subscribe((langObj) => {
      const colors$ = this.colorService.getColors(langObj.lang);
      const categories$ = this.categoryService.getCategories(langObj.lang);

      forkJoin([colors$, categories$]).subscribe(([colors, categories]) => {
        this.addProductForm$ = this.formService.addProductForm(
          sizes,
          brands,
          colors,
          categories
        );
      });
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
    console.log('DATA', data);
    const newProduct: any = {
      product: {
        isListed: 1,
        imagePreview: '/nopreview',
      },
      productDetails: structuredClone(data.productDetails),
      productImages: structuredClone(data.productImages),
    };

    for (let key in data) {
      if (key !== 'productDetails' && key !== 'productImages') {
        newProduct.product[key] = data[key];
      }
    }

    this.productService.addProduct(newProduct).subscribe({
      next: (res) => {
        this.notifyService.notify.next('added product');
        this.router.navigate([
          'dashboard/products/detail-product/' + res.product.id,
        ]);
      },
      error: () => {
        this.notifyService.notify.next('something went wrong');
        this.router.navigate(['dashboard/products']);
      },
    });
  }
}
