import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card-order.component.html',
  styleUrls: ['./card-order.component.css'],
})
export class CardComponent implements OnInit {
  @Input() data!: {
    address: string;
    created_at: string;
    id: number;
    payment_status: string;
    status: string;
    total_price: number;
    transaction: string;
    transaction_date: string;
    user_id: number;
    products: any;
  };

  imagesArray: string[] = [];

  constructor() {}

  ngOnInit(): void {
    console.log('detailOrder in card details', this.data);

    this.data.products.map((el: any) => {
      this.imagesArray.push(el.image.image_path);
    });

    console.log('detailOrder in card details', this.imagesArray);
  }
}
