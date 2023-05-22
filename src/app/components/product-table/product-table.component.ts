import {
  Component,
  Input,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
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
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: any = [];
  @Input() length: number = 0;
  @Output() handlePageEventEmitter = new EventEmitter();
  displayedColumns: string[] = [
    'id',
    'image',
    'brand',
    'name',
    'category',
    'price',
    'actions',
  ];
  dataSource: any = {};

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  constructor(public dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.products);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.dataSource = new MatTableDataSource<any>(this.products);
    }
  }

  handlePageEvent(e: any) {
    this.handlePageEventEmitter.emit(e);
  }

  // trigger dialog
  openDialog(name: string, id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        deleteProduct: `Are you sure you want delete ${name}?`,
        id: id,
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed();
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }

  goToProductDetail(id: number | string) {
    this.router.navigate([`/dashboard/products/detail-product/${id}`]);
  }

  goToProductDelete(id: number | string) {
    this.router.navigate([`/dashboard/products/edit-product/${id}`]);
  }
}
