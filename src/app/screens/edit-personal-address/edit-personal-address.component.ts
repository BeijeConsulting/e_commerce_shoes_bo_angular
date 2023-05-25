import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { PersonalAddressData } from 'src/app/interfaces/PersonalAddressData';
import { PersonalAddress } from 'src/app/interfaces/PersonalData';
import { FormService } from 'src/app/services/form/form.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-edit-personal-address',
  templateUrl: './edit-personal-address.component.html',
  styleUrls: ['./edit-personal-address.component.css'],
})
export class EditPersonalAddressComponent {
  personalAddress: PersonalAddress;

  personalAddressForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private personalService: PersonalService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.personalAddress = this.route.snapshot.data['personalAddressResolver'];

    this.personalAddressForm$ = formService.personalAddressForm({
      label: this.personalAddress.label,
      fullName: this.personalAddress.name_surname,
      address: this.personalAddress.street_address,
      country: this.personalAddress.country,
      phoneNumber: this.personalAddress.telephone,
      zipCode: this.personalAddress.zipcode,
      instructions: this.personalAddress.instructions,
    });
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

  onSubmit(data: PersonalAddressData) {
    console.log('AddProductScreen Submit: ', data);

    const newPersonalAddress = {
      country: data.country,
      id: this.personalAddress.id,
      instructions: data.instructions ? data.instructions : '',
      label: data.label,
      name_surname: data.fullName,
      street_address: data.address,
      telephone: data.phoneNumber,
      zipcode: data.zipCode,
    };

    this.personalService
      .editPersonalAddress(this.personalAddress.id, newPersonalAddress)
      .pipe(
        finalize(() =>
          setTimeout(() => {
            console.log('Set interval');
            this.router.navigate(['dashboard/personal-area/addresses']);
          }, 1600)
        )
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notify('Successfully edited', true);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went wrong', false);
        },
      });
  }
}

// {
//   "label": "Casa Prova 3",
//   "name_surname": "Giuseppe Verdi",
//   "street_address": "via Pascoli",
//   "zipcode": "43343",
//   "telephone": "34343434343",
//   "country": "Portogallo",
//   "instructions": "lasciare fuori"
// }
