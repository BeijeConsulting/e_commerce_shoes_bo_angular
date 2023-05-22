import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { AddProductSizeInput } from 'src/app/classes/forms/AddProductSizeInput';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
})
export class AddProductsComponent {
  addProductForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.addProductForm$ = this.formService.addProductForm([
      new AddProductSizeInput({
        key: 'prodotto1',
        label: 'prodotto1',
        required: true,
        value: '',
        order: 25,
      }),
      new AddProductSizeInput({
        key: 'prodotto2',
        label: 'prodotto2',
        required: true,
        value: '',
        order: 25,
      }),
    ]);
  }

  onSubmit(data: any) {
    console.log('AddProductScreen Submit: ', data);
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
