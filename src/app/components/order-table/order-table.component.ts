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

  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  @Input() data: any = {};
  @Output() handleEventPageEmitter = new EventEmitter();

  dataSource: any = {};
  totalElement: number = 0;

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.data.orders);

    this.totalElement = this.data.total_element;

    this.dataSource.paginator = this.paginator;

    console.log('data in child table', this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.dataSource = new MatTableDataSource<any>(changes['data'].currentValue);
  }

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  // handle event for pagination
  handlePageEvent(event: any) {
    this.handleEventPageEmitter.emit(event);
    console.log('event', event);
  }

  // trigger dialog
  openDialog(value?: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        deleteProduct: `Are you sure you want delete ${value}?`,
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  detailOrder(id: number | string) {
    // console.log('detail', id);
    this.router.navigate([`/dashboard/orders/detail-order/${id}`]);
  }
}
