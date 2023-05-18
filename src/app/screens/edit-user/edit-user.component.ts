import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent {
  editUserForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.editUserForm$ = formService.editUserForm({
      birthDate: '11/05/2001',
      firstName: 'Mario',
      lastName: 'Rossi',
      email: 'mariorossi@gmail.com',
      id: '123123',
      phoneNumber: '2323424234',
      role: 'dataEntry',
    });
  }

  onSubmit(data: any) {
    console.log('EditUserScreen Submit: ', data);
  }
}
