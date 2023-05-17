import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
})
export class CardProductComponent {
  @Input() description: string = '';
  @Input() id: string | number = '';
  @Input() initialPrice: string | number = '';
  @Input() listPrce: string | number = '';
  @Input() color: string = '';
}
