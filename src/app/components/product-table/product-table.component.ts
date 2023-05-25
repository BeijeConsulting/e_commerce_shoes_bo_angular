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
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import {
  MatTableDataSource,
  MatTableDataSourcePaginator,
} from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

// Router
import { Router } from '@angular/router';

// Interfaces
import { ProductPreview } from 'src/app/interfaces/Product';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css'],
})
export class ProductTableComponent implements OnInit, OnChanges {
  @Input() products: ProductPreview[] = [];
  @Input() length: number = 0;
  @Input() isLoading: boolean = false;
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
  dataSource: MatTableDataSource<ProductPreview[]>;

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

  handlePageEvent(e: PageEvent) {
    this.handlePageEventEmitter.emit(e);
  }

  // trigger dialog
  openDialog(name: string, id: number, handleFn: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        msg: `Are you sure you want delete ${name}?`,
        productId: id,
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

  goToProductUpdate(id: number | string) {
    this.router.navigate([`/dashboard/products/edit-product/${id}`]);
  }
}
