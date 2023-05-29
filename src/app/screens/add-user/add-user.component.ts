import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { FormService } from 'src/app/services/form/form.service';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  addUserForm$: Observable<InputBase<string>[]>;

  constructor(
    private formService: FormService,
    private router: Router,
    private userService: UserService,
    private notifyService: NotifyService,
    private translatePipe: TranslatePipe
  ) {
    this.addUserForm$ = this.formService.addUserForm();
  }

  onSubmit(newUser: any) {
    console.log('AddUserForm Submit: ', newUser);
    console.log(newUser.date.format('YYYY-MM-DD'));

    const tmpObj = {
      birth_date: newUser.date.format('YYYY-MM-DD'),
      authorities: [
        'USER',
        newUser.role !== 'dataEntry'
          ? newUser.role.toUpperCase()
          : 'DATA_ENTRY',
      ],
      email: newUser.email,
      first_name: newUser.firstName,
      last_name: newUser.lastName,
      password: newUser.password,
      telephone: newUser.phoneNumber,
    };

    console.log('newUser submit: ', tmpObj);
    this.userService
      .addUser(tmpObj)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['/cms/users']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notifyService.showNotify(
            this.translatePipe.transform('userAdded'),
            true
          );
        },
        error: (err) => {
          console.log(err);
          this.notifyService.showNotify(
            this.translatePipe.transform('somethingWentWrong'),
            false
          );
        },
      });
  }
}
