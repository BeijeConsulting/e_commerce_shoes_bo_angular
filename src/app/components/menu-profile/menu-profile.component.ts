import { Component } from '@angular/core';

// Router
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css'],
})
export class MenuProfileComponent {
  constructor(private router: Router) {}

  goToPersonalArea() {
    this.router.navigate(['dashboard/personal-area']);
  }
}
