import { Component, ViewChild } from '@angular/core';

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
export class OrderTableComponent {
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

  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  constructor(public dialog: MatDialog, private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
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

  detailCoupon(id: number | string) {
    // console.log('detail', id);
    this.router.navigate([`/dashboard/orders/detail-order/${id}`]);
  }
}

export interface PeriodicElement {
  name: string;
  id: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { id: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { id: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { id: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { id: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { id: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { id: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { id: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { id: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { id: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { id: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { id: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { id: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { id: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { id: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { id: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { id: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { id: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { id: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { id: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];
