import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail-order',
  templateUrl: './detail-order.component.html',
  styleUrls: ['./detail-order.component.css'],
})
export class DetailOrderComponent implements OnInit {
  orderDetail!: {
    address: string;
    created_at: string;
    id: number;
    payment_status: string;
    status: string;
    total_price: number;
    transaction: string;
    transaction_date: string;
    user_id: number;
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.orderDetail = this.route.snapshot.data['ordersResolver'];
  }
}
