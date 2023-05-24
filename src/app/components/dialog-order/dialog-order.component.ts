import { Component, Inject, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

// Services
import { ProductService } from 'src/app/services/product/product.service';
import { OrderProduct } from 'src/app/interfaces/Order';

@Component({
  selector: 'app-dialog-order',
  templateUrl: './dialog-order.component.html',
  styleUrls: ['./dialog-order.component.css'],
})
export class DialogOrderComponent implements OnInit {
  displayedColumns: string[] = [
    'select',
    'id',
    'quantity',
    'name',
    'brand',
    'category',
    'startingPrice',
  ];

  selection = new SelectionModel<any>(true, []);

  productsList: OrderProduct[] = [];
  productListProva: any[] = [];
  length: number = 0;

  selectedData: any[] = [];

  dataSource = new MatTableDataSource<any>(this.productListProva);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogOrderComponent>,
    private productsService: ProductService
  ) {
    productsService.getProducts(1, 5, 'it').subscribe({
      next: (res) => {
        this.productsList = res.products;
        this.length = res.results;

        this.productListProva = res.products.map((el: any) => {
          return {
            ...el,
            quantity: '1',
          };
        });
      },
    });
  }

  ngOnInit(): void {
    this.selection.changed.subscribe();
  }

  doAction() {
    this.matDialogRef.close({ data: this.selectedData });
  }

  isAlreadyChecked(id: number): any {
    if (
      this.selectedData.find((el) => {
        return el.id === id;
      })
    )
      return true;
    return false;
  }

  // if checked, push the product obj in selectedData array
  checkIsChecked(e: any, product: OrderProduct) {
    if (e.checked) {
      console.log('check push', product);
      this.selectedData.push(product);
    }

    // when remove check, remove the obj from the selectedData array
    if (!e.checked) {
      this.selectedData = this.selectedData.filter(
        (el) => el.id !== product.id
      );
    }
  }

  // handle the product quantity from select input
  handleQuantity(e: any, id: number) {
    const findElement = this.selectedData.find((el) => {
      return el.id === id;
    });

    findElement.quantity = e;
  }

  // check the product selected, and take the quantity. If no checked, quantity = 1
  getValueQuantity(id: number): any {
    let filteredValue = this.selectedData.find((el) => el.id === id);

    if (filteredValue) return String(filteredValue.quantity);

    return '1';
  }

  closeDialog() {
    // console.log('this.data', this.data);
    this.matDialogRef.close();
  }

  // handle event for pagination
  handlePageEvent(e: any) {
    this.productsService
      .getProducts(e.pageIndex + 1, e.pageSize, 'it')
      .subscribe({
        next: (res) => {
          this.productListProva = res.products.map((el: any) => {
            return {
              ...el,
              quantity: '1',
            };
          });
        },
      });
  }

  // ** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  toggleAllRows() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.position + 1
    }`;
  }
}
