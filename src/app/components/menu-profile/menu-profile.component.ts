import { Component } from '@angular/core';

// Router
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-menu-profile',
  templateUrl: './menu-profile.component.html',
  styleUrls: ['./menu-profile.component.css'],
})
export class MenuProfileComponent {
  constructor(private router: Router) {}

  goToPersonalArea() {
    console.log('click');
    this.router.navigate(['personal-area']);
  }
}
