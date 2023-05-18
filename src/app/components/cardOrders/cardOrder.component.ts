import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './cardOrder.component.html',
  styleUrls: ['./cardOrder.component.css'],
})
export class CardComponent {
  @Input() title: string = '';
  @Input() id: string | number = '';
  @Input() transaction: string = '';
  @Input() transactionDate: string = '';
  @Input() paymentStatus: string = '';
  @Input() status: string = '';
  @Input() createdAt: string = '';
  @Input() userId: string = '';
  @Input() addresses: string = '';
}
