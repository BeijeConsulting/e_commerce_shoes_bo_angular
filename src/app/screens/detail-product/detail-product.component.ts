import { Component } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css'],
})
export class DetailProductComponent {
  product: any;
  sizes: any;
  images: any;

  constructor(
    private route: ActivatedRoute,
    private translateService: TranslateService
  ) {
    const response = this.route.snapshot.data['productsResolver'];
    this.product = { ...response.product };
    this.sizes = [...response.productDetails];
    this.images = [...response.productImages];
    console.log(this);
  }
}
