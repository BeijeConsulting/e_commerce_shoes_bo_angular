import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  constructor(private router: Router, private route: ActivatedRoute) {
    console.log(this.route.snapshot.data['usersResolver']);
  }

  addUser() {
    this.router.navigate(['dashboard/users/add-user']);
  }
}
