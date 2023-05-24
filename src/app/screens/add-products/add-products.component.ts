import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  addProductForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private translateService: TranslateService
  ) {
    console.log(this);
    const { sizes, colors, categories, brands } =
      this.route.snapshot.data['addProductsResolver'];

    this.addProductForm$ = this.formService.addProductForm(
      sizes,
      brands,
      colors,
      categories
    );
  }

  onSubmit(data: any) {
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

    this.productService
      .addProduct(newProduct)
      .subscribe((res) =>
        this.router.navigate([
          'dashboard/products/detail-product/' + res.product.id,
        ])
      );
  }
}
