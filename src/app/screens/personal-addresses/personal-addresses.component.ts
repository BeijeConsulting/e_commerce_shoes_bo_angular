import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { switchMap } from 'rxjs';
import { DialogComponent } from 'src/app/components/dialog/dialog.component';
import { PersonalAddressDataApi } from 'src/app/interfaces/PersonalAddressData';
import { NotifyService } from 'src/app/services/notify/notify.service';
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
    private notifyService: NotifyService,
    private translatePipe: TranslatePipe
  ) {
    this.addresses = this.route.snapshot.data['personalAddressesResolver'];

    console.log('this.addresses', this.addresses);
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
          this.notifyService.showNotify(
            this.translatePipe.transform('personalAddressDeleted'),
            true
          );
        },
        error: (err) => {
          console.log(err);
          this.notifyService.showNotify(
            this.translatePipe.transform('somethingWentWrong'),
            false
          );
        },
      });
  }

  addPersonalAddress(): void {
    this.router.navigate(['cms/personal-area/add-address']);
  }

  openDialog(id: number, item: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        item: item,
        message: 'confirmAddressDeletion',
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
