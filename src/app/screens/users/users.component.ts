import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  UserDataApi,
  UserDataResponseApi,
} from 'src/app/interfaces/UserDataApi';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  usersList: UserDataResponseApi;
  usersDTO: UserDataApi[] = [];
  totalUsers: number;

  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(this.route.snapshot.data['usersResolver']);
    this.usersList = structuredClone(this.route.snapshot.data['usersResolver']);
    this.usersDTO = this.usersList.usersDTO;
    this.totalUsers = this.usersList.total_element;
  }

  addUser() {
    this.router.navigate(['dashboard/users/add-user']);
  }
}
