import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { PersonalAddressData } from 'src/app/interfaces/PersonalAddressData';
import { FormService } from 'src/app/services/form/form.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-add-personal-address',
  templateUrl: './add-personal-address.component.html',
  styleUrls: ['./add-personal-address.component.css'],
})
export class AddPersonalAddressComponent {
  personalAddressForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private personalService: PersonalService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.personalAddressForm$ = formService.personalAddressForm();
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

    this.personalService
      .addPersonalAddress({
        country: data.country,
        instructions: data.instructions ?? '',
        label: data.label,
        name_surname: data.fullName,
        street_address: data.address,
        telephone: data.phoneNumber,
        zipcode: data.zipCode,
      })
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['cms/personal-area/addresses']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notify('Address added successfully', true);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went wrong', false);
        },
      });
  }
}
