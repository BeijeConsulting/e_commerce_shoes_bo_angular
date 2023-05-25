import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    private router: Router
  ) {
    this.addresses = this.route.snapshot.data['personalAddressesResolver'];

    console.log('this.addresses', this.addresses);
  }

  editAddress(id: number): void {
    this.router.navigate([`dashboard/personal-area/edit-address/${id}`]);
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
        next: (response: PersonalAddressDataApi[]) =>
          (this.addresses = response),
        error: (err) => console.log(err),
      });
  }

  addPersonalAddress(): void {
    this.router.navigate(['dashboard/personal-area/add-address']);
  }

  openDialog(id?: string, item?: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        msg: `Are you sure you want delete this ${item}?`,
        personalAddressId: id,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: (confirm) => {
        if (confirm && id) this.deleteAddress(Number(id));
      },
    });
    // dialogRef.afterClosed().subscribe(() => this.menuTrigger.focus());
  }
}
