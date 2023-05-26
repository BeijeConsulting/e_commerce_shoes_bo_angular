import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

// Router
import { Router } from '@angular/router';
import { OrderService } from 'src/app/services/order/order.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements OnInit, OnChanges {
  displayedColumns: string[] = [
    'id',
    'userId',
    'date',
    'paymentState',
    'state',
    'total',
    'transaction',
    'actions',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  @Input() data!: any;
  @Input() length: number = 0;
  @Output() handleEventPageEmitter = new EventEmitter();

  dataSource: any = [];
  totalElement: number = 0;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private orderService: OrderService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    console.log('data in child table', this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<any>(changes['data'].currentValue);
  }

  notify(message: string, success: boolean) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500,
      panelClass: success ? 'snackbar-success' : 'snackbar-error',
    };
    return this.snackBar.open(message, '', snackBarConfig);
  }

  // handle event for pagination
  handlePageEvent(event: any) {
    this.handleEventPageEmitter.emit(event);
  }

  // trigger dialog
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        item: 'order',
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.deleteOrder(id);
    });
  }

  deleteOrder(id: number): void {
    this.orderService
      .deleteSingleOrder(id)
      .pipe(
        switchMap(() => {
          return this.orderService.getOrdersPerPage(
            this.orderService.orderTableState.page,
            this.orderService.orderTableState.size
          );
        })
      )
      .subscribe({
        next: (res) => {
          this.notify('Order Deleted', true);
          console.log('res', res);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went wrong', false);
        },
      });
    console.log('delete order');
  }

  detailOrder(id: number | string) {
    this.router.navigate([`/cms/orders/detail-order/${id}`]);
  }

  editOrder(id: number | string) {
    this.router.navigate([`/cms/orders/edit-order/${id}`]);
  }
}
