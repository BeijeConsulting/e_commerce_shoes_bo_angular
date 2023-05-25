import { Component } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, catchError, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { AddNewUser } from 'src/app/interfaces/AddNewUser';
import { UserData } from 'src/app/interfaces/UserData';
import { FormService } from 'src/app/services/form/form.service';
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
    private snackBar: MatSnackBar
  ) {
    this.addUserForm$ = formService.addUserForm();
  }

  notify(message: string, success: boolean) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 1500,
      panelClass: success ? 'snackbar-success' : 'snackbar-error',
    };
    return this.snackBar.open(message, '', snackBarConfig);
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
            this.router.navigate(['/dashboard/users']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notify('User Added', true);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went wrong', true);
        },
      });
  }
}
