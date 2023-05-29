import { Component, OnInit } from '@angular/core';

// Router
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css'],
})
export class MenuProfileComponent implements OnInit {
  firstName: string;
  lastName: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.firstName.subscribe(
      (firstName) => (this.firstName = firstName)
    );
    this.authService.lastName.subscribe(
      (lastName) => (this.lastName = lastName)
    );
  }

  goToPersonalArea() {
    this.router.navigate(['cms']);
  }
}
