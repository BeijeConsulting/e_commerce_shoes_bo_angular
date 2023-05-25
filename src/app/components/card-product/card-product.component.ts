import { Component, Input } from '@angular/core';

import { ProductFull } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent {
  @Input() product: ProductFull;
}
