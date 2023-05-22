import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private productService: ProductService
  ) {
    const sizes = this.route.snapshot.data['productResolver'];
    console.log(sizes);
    this.addProductForm$ = this.formService.addProductForm(sizes);
  }

  onSubmit(data: any) {
    const newProduct: any = {
      product: {
        isListed: 1,
        imagePreview:
          'https://www.cisalfasport.it/dw/image/v2/BBVV_PRD/on/demandware.static/-/Sites-cisalfa-master/default/dw6d8538e9/cisalfa/files/S5549719-ABIW/image/S5549719_ABIW.jpg?sw=960&sh=1200',
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

    console.log(newProduct);

    this.productService
      .addProduct(newProduct)
      .subscribe((res) => console.log(res));
  }
}
