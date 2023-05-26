import { Component, OnInit } from '@angular/core';

// Interfaces
import { orderItem } from 'src/app/interfaces/Order';

// Router
import { ActivatedRoute, Router } from '@angular/router';

// Services
import { OrderService } from '../../services/order/order.service';
import { ErrorService } from 'src/app/services/notify/notify.service';

// Angular material
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  ordersItem!: orderItem[];
  ordersLength: number = 0;
  isLoading: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private errorService: ErrorService,
    private snackBar: MatSnackBar,
    private translatePipe: TranslatePipe
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

    // handle id not exist
    this.errorService.error.subscribe((err: string) => {
      // if (err === 'order not found') {
      //   console.log('order not found', err);
      //   this.notifyProductNotFound();
      //   this.errorService.error.next('');
      // }

      if (err) {
        this.notifyProductNotFound(err);
        this.errorService.error.next('');
      }
    });
  }

  getPaginatedOrders(event: PageEvent) {
    this.isLoading = true;
    const page = event.pageIndex + 1;
    const per_page = event.pageSize;

    this.orderService.orderTableState = { page: page, size: per_page };

    this.orderService.getOrdersPerPage(page, per_page).subscribe({
      next: () => {
        this.isLoading = false;
      },
    });
  }

  addOrder() {
    this.router.navigate(['cms/orders/add-order']);
  }

  notifyProductNotFound(err: string) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
      panelClass: 'snackbar-error',
    };
    return this.snackBar.open(
      this.translatePipe.transform(err),
      '',
      snackBarConfig
    );
  }
}
