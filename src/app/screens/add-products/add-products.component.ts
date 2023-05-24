import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router
  ) {
    const sizes = this.route.snapshot.data['productResolver'];
    this.addProductForm$ = this.formService.addProductForm(sizes);
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
      console.log(key);
      if (key !== 'productDetails' && key !== 'productImages') {
        newProduct.product[key] = data[key];
      }
    }

    console.log('NUOVO PRODOTTO', newProduct);

    this.productService
      .addProduct(newProduct)
      .subscribe((res) =>
        this.router.navigate([
          'dashboard/products/detail-product/' + res.product.id,
        ])
      );
  }
}
