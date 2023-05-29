import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, finalize, switchMap } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import {
  PersonalData,
  PersonalDataEdit,
  PersonalDataEditForm,
} from 'src/app/interfaces/PersonalData';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/form/form.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { PersonalService } from 'src/app/services/personal/personal.service';
import { StorageService } from 'src/app/services/storage/storage.service';

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
    private datePipe: DatePipe,
    private authService: AuthService,
    private storageService: StorageService,
    private notifyService: NotifyService
  ) {
    this.personalData = this.route.snapshot.data['personalDataResolver'];
    this.authService.firstName.next(this.personalData.first_name);
    this.authService.lastName.next(this.personalData.last_name);

    this.storageService.setStorage('user', {
      firstName: this.personalData.first_name,
      lastName: this.personalData.last_name,
    });

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

          this.notifyService.showNotify('Success', true);
        },
        error: (err) => {
          console.log(err);
          this.notifyService.showNotify('Something went wrong', false);
        },
      });

    console.log('AddProductScreen Submit: ', data);
  }
}
