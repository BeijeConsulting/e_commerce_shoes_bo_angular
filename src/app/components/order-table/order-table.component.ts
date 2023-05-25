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

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data);
    this.dataSource.paginator = this.paginator;
    console.log('data in child table', this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<any>(changes['data'].currentValue);
  }

  // handle event for pagination
  handlePageEvent(event: any) {
    this.handleEventPageEmitter.emit(event);
  }

  // trigger dialog
  openDialog(name: string = 'this Order', id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        msg: `Are you sure you want delete ${name}?`,
        orderId: id,
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  detailOrder(id: number | string) {
    this.router.navigate([`/dashboard/orders/detail-order/${id}`]);
  }

  editOrder(id: number | string) {
    this.router.navigate([`/dashboard/orders/edit-order/${id}`]);
  }
}
