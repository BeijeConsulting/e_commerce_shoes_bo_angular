import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';

// Angular Material
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

// Router
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CouponService } from 'src/app/services/coupon/coupon.service';
import { CouponDataApi } from 'src/app/interfaces/CouponDataApi';

@Component({
  selector: 'app-table',
  templateUrl: './coupon-table.component.html',
  styleUrls: ['./coupon-table.component.css'],
})
export class TableComponent implements OnInit, OnDestroy {
  totalSize: number = 0;
  couponsList: CouponDataApi[] = [];

  subscriptions = new Subscription();

  displayedColumns: string[] = [
    'id',
    'code',
    'maxUses',
    'expirationDate',
    'state',
    'type',
    'value',
    'minOrder',
    'actions',
  ];
  // dataSource = new MatTableDataSource<CouponDataApi>();

  // @ViewChild(MatPaginator) paginator!: MatPaginator;
  // @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private couponService: CouponService
  ) {}

  ngOnInit(): void {
    // this.dataSource.paginator = this.paginator;

    this.subscriptions.add(
      this.couponService.couponResponse$.subscribe({
        next: (response) => {
          console.log('Subscribed: ', response);
          if (response) {
            this.totalSize = response.total_element;
            this.couponsList = response.coupons;
          }
        },
      })
    );
  }

  // trigger dialog
  openDialog(value?: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        deleteProduct: `Are you sure you want delete ${value}?`,
        // deleteUser: 'Are you sure you want delete this user?',
        // deleteOrder: 'Are you sure you want delete this order?',
        // deleteCoupon: 'Are you sure you want delete this coupon?',
        // logout: 'Are you sure you want log out?',
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  detailCoupon(coupon: CouponDataApi) {
    console.log('coupon', coupon);
    this.router.navigate([`/dashboard/coupons/detail-coupon/${coupon.id}`]);
  }

  pageEvent(e: any): void {
    this.couponService.getCoupons(e.pageIndex + 1, e.pageSize).subscribe({
      next: () => {
        this.couponService.couponTableDataState = {
          page: e.pageIndex + 1,
          size: e.pageSize,
        };
      },
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
