import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

// Angular Material
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogComponent } from '../dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

// Router
import { Router } from '@angular/router';
import { UserDataApi } from 'src/app/interfaces/UserDataApi';
import { UserService } from 'src/app/services/user/user.service';
import { UserData } from 'src/app/interfaces/UserData';
import { Subscription, forkJoin, switchMap } from 'rxjs';
import { NotifyService } from 'src/app/services/notify/notify.service';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
})
export class UserTableComponent implements OnInit, OnDestroy {
  @Input() employees: boolean = false;
  subscriptions = new Subscription();

  isLoading: boolean = false;

  userObs: UserDataApi[] = [];
  totalSizeObs: number = 0;

  displayedColumns: string[] = [
    'id',
    'name',
    'lastName',
    'email',
    'phone',
    'birthDate',
    'actions',
  ];
  // dataSource = new MatTableDataSource<UserDataApi>(this.users);
  dataSource = new MatTableDataSource<UserDataApi>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('menuTrigger') menuTrigger!: MatMenuTrigger; // menuTrigger for dialog

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService,
    private notifyService: NotifyService,
    private translatePipe: TranslatePipe
  ) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;

    if (!this.employees) {
      this.subscriptions.add(
        this.userService.usersResponse$.subscribe((response) => {
          if (response) {
            this.totalSizeObs = response.total_element;
            this.userObs = response.usersDTO;
          }
          console.log('userResponse$ Changed', response);
        })
      );
    }

    if (this.employees) {
      this.subscriptions.add(
        this.userService.employeeResponse$.subscribe((response) => {
          if (response) {
            this.totalSizeObs = response.total_element;
            this.userObs = response.usersDTO;
          }
          console.log('employeeResponse$ Changed', response);
        })
      );
    }
  }

  deleteUser(id: number): void {
    this.userService
      .deleteUser(id)
      .pipe(
        switchMap(() => {
          return forkJoin({
            users: this.userService.getUsers(
              this.userService.userTableDataState.page,
              this.userService.userTableDataState.size,
              false
            ),
            employees: this.userService.getUsers(
              this.userService.employeesTableDataState.page,
              this.userService.employeesTableDataState.size,
              true
            ),
          });
        })
      )
      .subscribe({
        next: () => {
          console.log('User Deleted');
          this.notifyService.showNotify(
            this.translatePipe.transform('userDeleted'),
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

  // trigger dialog
  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogComponent, {
      restoreFocus: false,
      data: {
        item: id,
        message: 'confirmUserDeletion',
      },
    });

    // Manually restore focus to the menu trigger since the element that
    // opens the dialog won't be in the DOM any more when the dialog closes.
    dialogRef.afterClosed().subscribe((confirm) => {
      if (confirm) this.deleteUser(id);
    });
  }

  detailUser(user: UserDataApi) {
    console.log('Usr: ', user);
    // console.log('detail', id);
    this.router.navigate([
      `/cms/users/detail-user/${user.id}`,
      { user: JSON.stringify(user) },
    ]);
  }

  editUser(user: UserDataApi): void {
    console.log(user);

    const userAdapt: UserData = {
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      id: String(user.id),
      role: user.authories.length === 1 ? user.authories[0] : user.authories[1],
      phoneNumber: user.telephone,
      birthDate: user.birth_date,
    };

    this.router.navigate([
      `/cms/users/edit-user/${user.id}`,
      { user: JSON.stringify(userAdapt) },
    ]);
  }

  pageEvent(e: PageEvent): void {
    if (!this.employees) {
      this.isLoading = true;
      this.userService.getUsers(e.pageIndex + 1, e.pageSize).subscribe({
        next: () => {
          this.isLoading = false;
          this.userService.userTableDataState = {
            page: e.pageIndex + 1,
            size: e.pageSize,
          };
        },
      });
    }
    if (this.employees) {
      this.isLoading = true;
      this.userService.getUsers(e.pageIndex + 1, e.pageSize, true).subscribe({
        next: () => {
          this.isLoading = false;
          this.userService.employeesTableDataState = {
            page: e.pageIndex + 1,
            size: e.pageSize,
          };
        },
      });
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
