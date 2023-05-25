import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Interfaces
import {
  ProductFull,
  ProductDetailsFull,
  ProductImageFull,
} from 'src/app/interfaces/Product';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {
  product: ProductFull;
  sizes: ProductDetailsFull[];
  images: ProductImageFull[];

  constructor(private route: ActivatedRoute) {
    const response: {
      product: ProductFull;
      productDetails: ProductDetailsFull[];
      productImages: ProductImageFull[];
    } = this.route.snapshot.data['productsResolver'];

    this.product = { ...response.product };
    this.sizes = [...response.productDetails];
    this.images = [...response.productImages];
  }
}
