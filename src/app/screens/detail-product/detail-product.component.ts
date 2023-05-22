import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {
  product: any;
  sizes: any;
  images: any;

  constructor(private route: ActivatedRoute) {
    const response = this.route.snapshot.data['productsResolver'];
    this.product = { ...response.product };
    this.sizes = [...response.productDetails];
    this.images = [...response.productImages];
    console.log(this.product);
  }
}
