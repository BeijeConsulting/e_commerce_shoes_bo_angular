import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent {
  editPersonalDataForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.editPersonalDataForm$ = formService.editPersonalDataForm({
      firstName: 'Mario',
      lastName: 'Rossi',
      birthDate: '11/20/1989',
      email: 'mariorossi@gmail.com',
      password: 'Password@1',
      phoneNumber: '3333333333',
    });
  }

  onSubmit(data: any) {
    console.log('AddProductScreen Submit: ', data);
  }
}
