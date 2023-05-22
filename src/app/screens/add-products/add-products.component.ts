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
      },
      productDetails: [...data.productDetails],
      productImages: [...data.productImages],
    };

    for (let key in data) {
      console.log(key);
      if (key !== 'productDetails' && key !== 'productImages') {
        newProduct.product[key] = data[key];
      }
    }

    this.productService
      .addProduct(newProduct)
      .subscribe((res) => console.log(res));
  }
}

/*

{
  "product": {
      "name": "rtrevtrtvrdtv",
      "brand": "nike",
      "color": "rosso",
      "startingPrice": "20",
      "listedPrice": "25",
      "type": "w",
      "descriptionIt": "cdmisidmsidsm",
      "descriptionEng": "diemfeifmefi",
      "category": "running",
      "isListed": 1,
      "imagePreview": "/nopreview"
  },
  "productDetails": [
      {
          "is_listed": true,
          "quantity": "5",
          "selling_price": "29",
          "size": "35"
      },
      {
          "is_listed": true,
          "quantity": "8",
          "selling_price": "35",
          "size": "36"
      }
  ],
  "productImages": [
      
  ]
}

*/
