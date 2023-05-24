import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  product: any;
  id: number;
  editProductForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    const product = this.route.snapshot.data['productsResolver'];
    console.log('PRODOTTO DA EDITARE', product);
    this.editProductForm$ = this.formService.editProductForm(product);
    this.id = product.product.id;
  }

  onSubmit(data: any) {
    const productDetailsRaw: any = [...data.productDetails];
    const productImagesRaw: any = [...data.productImages];
    const productImages: any = [];
    const productDetails: any = [];
    const product: any = {
      isListed: 1,
      imagePreview: '/nopreview',
    };

    productDetailsRaw.forEach((item: any) => {
      const detailObj: any = {};

      console.log(item);

      for (let key in item) {
        if (
          key === 'isListed' ||
          key === 'quantity' ||
          key === 'sellingPrice' ||
          key === 'size'
        ) {
          detailObj[key] = item[key];
        }
      }

      productDetails.push(detailObj);
    });

    productImagesRaw.forEach((item: any) => {
      const imageObj: any = {};

      for (let key in item) {
        if (
          key === 'altEng' ||
          key === 'altIt' ||
          key === 'imageNumber' ||
          key === 'type' ||
          key === 'imagePath'
        ) {
          imageObj[key] = item[key];
        }
      }

      productImages.push(imageObj);
    });

    for (let key in data) {
      if (key !== 'productDetails' && key !== 'productImages') {
        product[key] = data[key];
      }
    }

    const editedProduct: any = {
      product,
      productDetails,
      productImages,
    };

    console.log(editedProduct);
    this.productService
      .editProduct(editedProduct, this.id)
      .pipe(
        finalize(() =>
          this.router.navigate([`dashboard/products/detail-product/${this.id}`])
        )
      )
      .subscribe();
  }
}
