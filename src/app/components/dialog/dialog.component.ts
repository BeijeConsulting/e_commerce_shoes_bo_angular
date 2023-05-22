import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

// Angular material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { finalize, forkJoin, switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent implements OnInit, OnDestroy {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private matDialogRef: MatDialogRef<DialogComponent>,
    private userService: UserService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {}

  closeDialog() {
    this.matDialogRef.close(this.data);
  }

  onDelete() {
    // alert('delete successfully'); // only for test

    if (this.data.hasOwnProperty('userId')) {
      console.log(this.data);
      console.log('users table state:', this.userService.userTableDataState);
      console.log(
        'employees table state:',
        this.userService.employeesTableDataState
      );

      const userTableState = this.userService.userTableDataState;
      const employeesTableState = this.userService.employeesTableDataState;

      this.userService
        .deleteUser(this.data.userId)
        .pipe(
          switchMap(() => {
            return forkJoin({
              users: this.userService.getUsers(
                userTableState.page,
                userTableState.size,
                false
              ),
              employees: this.userService.getUsers(
                employeesTableState.page,
                employeesTableState.size,
                true
              ),
            });
          }),
          finalize(() => {
            this.closeDialog();
          })
        )
        .subscribe({
          next: () => console.log('User Deleted'),
          error: (err) => console.log(err),
        });
    }

    if (this.data.type && this.data.type === 'product delete') {
      this.productService
        .deleteSingleProduct(this.data.id)
        .subscribe(() => this.productService.getProducts(1, 5, 'it'));
      this.closeDialog();
    }

    // this.closeDialog();
  }

  ngOnDestroy(): void {
    this.closeDialog();
  }
}
