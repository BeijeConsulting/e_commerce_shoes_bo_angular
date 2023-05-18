import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-personal-address',
  templateUrl: './add-personal-address.component.html',
  styleUrls: ['./add-personal-address.component.css'],
})
export class AddPersonalAddressComponent {
  personalAddressForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.personalAddressForm$ = formService.personalAddressForm();
  }

  onSubmit(data: any) {
    console.log('AddProductScreen Submit: ', data);
  }
}
