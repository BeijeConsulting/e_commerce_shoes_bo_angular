import { Component, OnInit } from '@angular/core';

// Router
import { ActivatedRoute, Router } from '@angular/router';
// Services
import { OrderService } from '../../services/order/order.service';
import { orderItem } from 'src/app/interfaces/Order';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersItem!: orderItem;
  ordersLength: number = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {
    const response = this.route.snapshot.data['ordersResolver'];

    this.ordersItem = response.orders;
    this.ordersLength = response.total_element;
  }

  ngOnInit(): void {
    this.orderService.orders.subscribe((res) => {
      this.ordersItem = res.orders;
      this.ordersLength = res.total_element;
    });
  }

  getPaginatedOrders(event: any) {
    const page = event.pageIndex + 1;
    const per_page = event.pageSize;

    this.orderService.orderTableState = { page: page, size: per_page };

    this.orderService.getOrdersPerPage(page, per_page);
  }

  addOrder() {
    this.router.navigate(['dashboard/orders/add-order']);
  }
}
