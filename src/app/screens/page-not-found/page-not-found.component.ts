import { Component } from '@angular/core';

// Router
import { Router } from '@angular/router';

// Lottie
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {
  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_suhe7qtm.json',
  };

  constructor(private router: Router) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  goPersonalArea(): void {
    this.router.navigate(['/dashboard/personal-area']);
  }
}
