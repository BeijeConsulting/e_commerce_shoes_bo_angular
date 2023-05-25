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
import { TranslateService } from '@ngx-translate/core';
import { ProductService } from 'src/app/services/product/product.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<any>(this.products);
    this.dataSource.paginator = this.paginator;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['products']) {
      this.dataSource = new MatTableDataSource<any>(this.products);
    }
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

  handlePageEvent(e: PageEvent) {
    this.handlePageEventEmitter.emit(e);
  }

  // trigger dialog
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        item: 'product',
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.deleteProduct(id);
    });
  }

  deleteProduct(id: number): void {
    const language: string = this.translate.currentLang;
    this.productService.deleteSingleProduct(id).subscribe({
      next: () => {
        this.productService.getProducts(1, 5, language);
        this.notify('Product deleted', true);
      },
      error: (err) => {
        console.log(err);
        this.notify('Something went wrong', false);
      },
    });
  }

  goToProductDetail(id: number | string) {
    this.router.navigate([`/dashboard/products/detail-product/${id}`]);
  }

  goToProductUpdate(id: number | string) {
    this.router.navigate([`/dashboard/products/edit-product/${id}`]);
  }
}
