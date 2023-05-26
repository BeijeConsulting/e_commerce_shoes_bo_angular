import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PersonalAddressDataApi } from 'src/app/interfaces/PersonalAddressData';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-personal-addresses',
  templateUrl: './personal-addresses.component.html',
  styleUrls: ['./personal-addresses.component.css'],
})
export class PersonalAddressesComponent {
  addresses: PersonalAddressDataApi[];

  constructor(
    private personalService: PersonalService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.addresses = this.route.snapshot.data['personalAddressesResolver'];

    console.log('this.addresses', this.addresses);
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

  editAddress(id: number): void {
    this.router.navigate([`cms/personal-area/edit-address/${id}`]);
  }

  deleteAddress(id: number): void {
    this.personalService
      .deletePersonalAddress(id)
      .pipe(
        switchMap(() => {
          return this.personalService.getPersonalAddresses();
        })
      )
      .subscribe({
        next: (response: PersonalAddressDataApi[]) => {
          this.addresses = response;
          this.notify('Deleted', true);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went worng', false);
        },
      });
  }

  addPersonalAddress(): void {
    this.router.navigate(['cms/personal-area/add-address']);
  }

  openDialog(id: number, item?: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        item: item,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (confirm) => {
        console.log('confirm: ', confirm, id);

        if (confirm) this.deleteAddress(id);
      },
    });
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
