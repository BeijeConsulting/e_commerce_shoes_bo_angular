import { Component } from '@angular/core';

// Router
import { Router } from '@angular/router';

// Lottie
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';

@Component({
  selector: 'app-not-allowed',
  templateUrl: './not-allowed.component.html',
  styleUrls: ['./not-allowed.component.css'],
})
export class NotAllowedComponent {
  options: AnimationOptions = {
    path: 'https://assets9.lottiefiles.com/packages/lf20_bc4ugzhr.json',
  };

  constructor(private router: Router) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  goPersonalArea(): void {
    this.router.navigate(['/dashboard/personal-area']);
  }
}
