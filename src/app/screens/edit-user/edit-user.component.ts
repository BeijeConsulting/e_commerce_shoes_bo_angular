import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, finalize } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { UserData } from 'src/app/interfaces/UserData';
import { UserDataApi } from 'src/app/interfaces/UserDataApi';
import { FormService } from 'src/app/services/form/form.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnInit {
  editUserForm$: Observable<InputBase<string>[]>;
  user: UserData;

  constructor(
    private formService: FormService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.user = JSON.parse(this.route.snapshot.params['user']);
    console.log(this.user);

    this.editUserForm$ = formService.editUserForm(this.user);
  }

  ngOnInit(): void {
    // console.log(this.route.snapshot.params['user']);
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

  onSubmit(data: any) {
    console.log('EditUserScreen Submit: ', data);

    const userAdapt = {
      authorities: [data.role],
      birth_date: this.datePipe.transform(data.date, 'YYYY-MM-dd'),
      email: data.email,
      first_name: data.firstName,
      last_name: data.lastName,
      // password: '',
      telephone: data.phoneNumber,
    };

    console.log('userAdapt: ', userAdapt);

    this.userService
      .editUser(data.id, userAdapt)
      .pipe(
        finalize(() => {
          setTimeout(() => {
            this.router.navigate(['cms/users']);
          }, 1600);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
          this.notify('User edited', true);
        },
        error: (err) => {
          console.log(err);
          this.notify('Something went wrong', false);
        },
      });
  }
}
