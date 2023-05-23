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

    console.log('NUOVO PRODOTTO', newProduct);

    this.productService
      .addProduct(newProduct)
      .subscribe((res) => console.log(res));
  }
}

/* {
  "product": {
      "name": "air max 27fudnfu",
      "brand": "Hoka",
      "color": "Multicolor",
      "startingPrice": "80",
      "listedPrice": "148",
      "type": "W",
      "descriptionIt": "La pluripremiata Clifton è giunta alla sua nona versione. Più leggera e ammortizzata che mai. Eliminando peso e aggiungendo 3 mm di altezza della suola, la nuova Clifton 9 offre sensazioni rivitalizzanti alla pianta del piede con una nuova schiuma reattiva e un design della suola migliorato. Privata dei rinforzi e degli elementi termofusi, la tomaia semplificata è stata realizzata con metodi attenti all’ambiente e presenta un tallone più morbido, un pannello catarifrangente sul tallone e una linguetta snellita con pannello sul lato mediale.Te ne innamorerai perché è una scarpa da running rivoluzionaria, perfetta per gli allenamenti di tutti i giorni.",
      "descriptionEng": "The award-winning Clifton is now in its ninth version. Lighter and more cushioned than ever before. Eliminating weight and adding 3 mm of sole height, the new Clifton 9 delivers revitalizing sensations to the sole of the foot with new responsive foam and an improved outsole design. Deprived of reinforcements and heat-molded elements, the simplified upper is made with environmentally conscious methods and features a softer heel, a reflective heel panel, and a streamlined tongue with a panel on the medial side.You'll fall in love with it because it's a revolutionary running shoe perfect for everyday workouts.",
      "category": "Fitness",
      "isListed": 1,
      "imagePreview": "/nopreview"
  },
  "productDetails": [
      {
          "is_listed": true,
          "quantity": "5",
          "selling_price": "90",
          "size": "W42"
      }
  ],
  "productImages": [
      {
        "imagePath": "ciao",
          "altEng": "image",
          "altIt": "immagine",
          "imageNumber": 0,
          "type": "desktop"
      },
      {
          "altEng": "image",
          "altIt": "immagine",
          "imageNumber": 0,
          "type": "desktop"
      },
      {
          "altEng": "image",
          "altIt": "immagine",
          "imageNumber": 0,
          "type": "desktop"
      },
      {
          "altEng": "image",
          "altIt": "immagine",
          "imageNumber": 0,
          "type": "desktop"
      }
  ]
} */
