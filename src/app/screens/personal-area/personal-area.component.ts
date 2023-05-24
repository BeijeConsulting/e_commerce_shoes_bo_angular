import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize, switchMap } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import {
  PersonalData,
  PersonalDataEdit,
  PersonalDataEditForm,
} from 'src/app/interfaces/PersonalData';
import { UserData } from 'src/app/interfaces/UserData';
import { FormService } from 'src/app/services/form/form.service';
import { PersonalService } from 'src/app/services/personal/personal.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.css'],
})
export class PersonalAreaComponent {
  editPersonalDataForm$: Observable<InputBase<string>[]>;
  showPersonalDataForm: boolean = false;

  personalData: PersonalData;

  constructor(
    private formService: FormService,
    private personalService: PersonalService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.personalData = this.route.snapshot.data['personalDataResolver'];

    console.log('PersonalData: ', this.personalData);

    this.editPersonalDataForm$ = formService.editPersonalDataForm({
      firstName: this.personalData.first_name,
      lastName: this.personalData.last_name,
      birthDate: this.personalData.birth_date,
      email: this.personalData.email,
      password: this.personalData.password ? this.personalData.password : '',
      phoneNumber: this.personalData.telephone,
    });
  }

  // user: any = {
  //   telephone: '3337571233',
  //   email: 'paolo1@gmail.com',
  //   password: null,
  //   addresses: [
  //     {
  //       id: 100,
  //       label: 'Casa',
  //       country: 'Italia',
  //       telephone: '0818723737',
  //       zipcode: '80053',
  //       instructions: 'Bussare al citofono',
  //       name_surname: 'Paolo Di Martino',
  //       street_address: 'via dei Martiri, 14',
  //       user_id: 88,
  //     },
  //     {
  //       id: 113,
  //       label: 'Ufficio',
  //       country: 'Italia',
  //       telephone: '3213332134',
  //       zipcode: '87632',
  //       instructions: 'Lasciare in portineria',
  //       name_surname: 'Alfonso Di Martino',
  //       street_address: 'via Largo Fusco, 3',
  //       user_id: 88,
  //     },
  //     {
  //       id: 126,
  //       label: 'Casa vacanze',
  //       country: 'Italia',
  //       telephone: '3337473876',
  //       zipcode: '80045',
  //       instructions: "Lasciare all'ingresso",
  //       name_surname: 'Giuseppe Di Martino',
  //       street_address: 'via Vico Perduto, 4',
  //       user_id: 88,
  //     },
  //   ],
  //   last_name: 'Di Martino',
  //   first_name: 'Paolo',
  //   wish_list_item: 1,
  //   cart_items: 2,
  //   birth_date: '1999-02-10',
  // };

  showForm(): void {
    this.showPersonalDataForm = true;
  }

  hideForm(): void {
    this.showPersonalDataForm = false;
  }

  onSubmit(data: PersonalDataEditForm) {
    const personalData: PersonalDataEdit = {
      birth_date: this.datePipe.transform(data.birthDate, 'YYYY-MM-dd') ?? '',
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      password: data.password === '' ? null : data.password,
      telephone: data.phoneNumber,
    };

    console.log('PERSONALDATA: ', personalData);

    this.personalService
      .editPersonalData(personalData)
      .pipe(
        switchMap(() => {
          return this.personalService.getPersonalData();
        }),
        finalize(() => this.hideForm())
      )
      .subscribe({
        next: (response) => {
          this.personalData = response;

          console.log('response', response);

          this.editPersonalDataForm$ = this.formService.editPersonalDataForm({
            firstName: response.first_name,
            lastName: response.last_name,
            birthDate: response.birth_date,
            email: response.email,
            password: response.password ? response.password : '',
            phoneNumber: response.telephone,
          });
        },
        error: (err) => console.log(err),
      });

    console.log('AddProductScreen Submit: ', data);
  }
}
