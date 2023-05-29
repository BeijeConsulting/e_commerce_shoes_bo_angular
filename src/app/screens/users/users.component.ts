import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  UserDataApi,
  UserDataResponseApi,
} from 'src/app/interfaces/UserDataApi';
import { NotifyService } from 'src/app/services/notify/notify.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  usersList: UserDataResponseApi;
  usersDTO: UserDataApi[] = [];
  totalUsers: number;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private errorService: NotifyService,
    private snackBar: MatSnackBar,
    private translatePipe: TranslatePipe
  ) {
    console.log(this.route.snapshot.data['usersResolver']);
    this.usersList = structuredClone(this.route.snapshot.data['usersResolver']);
    this.usersDTO = this.usersList.usersDTO;
    this.totalUsers = this.usersList.total_element;
  }

  ngOnInit(): void {
    this.errorService.notify.subscribe((err) => {
      if (err) {
        this.notifyUserNotFound(err);
        this.errorService.notify.next('');
      }
    });
  }

  notifyUserNotFound(err: string) {
    const snackBarConfig: MatSnackBarConfig = {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration: 2500,
      panelClass: 'snackbar-error',
    };
    return this.snackBar.open(
      this.translatePipe.transform(err),
      '',
      snackBarConfig
    );
  }

  addUser() {
    this.router.navigate(['cms/users/add-user']);
  }
}
