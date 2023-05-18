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
  showPersonalDataForm: boolean = false;

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

  user: any = {
    telephone: '3337571233',
    email: 'paolo1@gmail.com',
    password: null,
    addresses: [
      {
        id: 100,
        label: 'Casa',
        country: 'Italia',
        telephone: '0818723737',
        zipcode: '80053',
        instructions: 'Bussare al citofono',
        name_surname: 'Paolo Di Martino',
        street_address: 'via dei Martiri, 14',
        user_id: 88,
      },
      {
        id: 113,
        label: 'Ufficio',
        country: 'Italia',
        telephone: '3213332134',
        zipcode: '87632',
        instructions: 'Lasciare in portineria',
        name_surname: 'Alfonso Di Martino',
        street_address: 'via Largo Fusco, 3',
        user_id: 88,
      },
      {
        id: 126,
        label: 'Casa vacanze',
        country: 'Italia',
        telephone: '3337473876',
        zipcode: '80045',
        instructions: "Lasciare all'ingresso",
        name_surname: 'Giuseppe Di Martino',
        street_address: 'via Vico Perduto, 4',
        user_id: 88,
      },
    ],
    last_name: 'Di Martino',
    first_name: 'Paolo',
    wish_list_item: 1,
    cart_items: 2,
    birth_date: '1999-02-10',
  };

  showForm(): void {
    this.showPersonalDataForm = true;
  }

  hideForm(): void {
    this.showPersonalDataForm = false;
  }

  onSubmit(data: any) {
    console.log('AddProductScreen Submit: ', data);
  }
}
