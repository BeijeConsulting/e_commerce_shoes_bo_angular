import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm$: Observable<InputBase<string>[]>;

  constructor(private formService: FormService) {
    this.addUserForm$ = formService.addUserForm();
  }

  onSubmit(data: any) {
    console.log('AddUserForm Submit: ', data);
  }
}
