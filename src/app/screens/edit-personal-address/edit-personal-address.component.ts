import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-personal-address',
  templateUrl: './edit-personal-address.component.html',
  styleUrls: ['./edit-personal-address.component.css'],
})
export class EditPersonalAddressComponent {
  personalAddressForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.personalAddressForm$ = formService.personalAddressForm({
      label: 'label',
      fullName: 'Mario Rossi',
      address: 'Via Roma',
      country: 'Italia',
      phoneNumber: '333333333',
      zipCode: '39239',
      instructions: 'Bussare al citofono',
    });
  }

  onSubmit(data: any) {
    console.log('AddProductScreen Submit: ', data);
  }
}
