import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersItem!: {
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

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.ordersItem = this.route.snapshot.data['ordersResolver'];
  }

  getPaginatedOrders(event: any) {
    const page = event.pageIndex + 1;
    const per_page = event.pageSize;

    this.orderService.getOrdersPerPage(page, per_page).subscribe((res) => {
      this.ordersItem = res.orders;
    });
  }

  addOrder() {
    this.router.navigate(['dashboard/orders/add-order']);
  }
}
