import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { PersonalAddressData } from 'src/app/interfaces/PersonalAddressData';
import { PersonalAddress } from 'src/app/interfaces/PersonalData';
import { FormService } from 'src/app/services/form/form.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
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
    private notifyService: NotifyService
  ) {
    this.personalAddress = this.route.snapshot.data['personalAddressResolver'];

    this.personalAddressForm$ = this.formService.personalAddressForm({
      label: this.personalAddress.label,
      fullName: this.personalAddress.name_surname,
      address: this.personalAddress.street_address,
      country: this.personalAddress.country,
      phoneNumber: this.personalAddress.telephone,
      zipCode: this.personalAddress.zipcode,
      instructions: this.personalAddress.instructions,
    });
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
            this.router.navigate(['cms/personal-area/addresses']);
          }, 1600)
        )
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notifyService.showNotify('Successfully edited', true);
        },
        error: (err) => {
          console.log(err);
          this.notifyService.showNotify('Something went wrong', false);
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
