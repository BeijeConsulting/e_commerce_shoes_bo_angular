import { Component } from '@angular/core';

// Router
import { Router } from '@angular/router';

// Lottie
import { AnimationItem, AnimationOptions } from 'ngx-lottie/lib/symbols';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css'],
})
export class PageNotFoundComponent {
  goToLabel: string;

  options: AnimationOptions = {
    path: 'https://assets10.lottiefiles.com/packages/lf20_suhe7qtm.json',
  };

  constructor(private router: Router, private authService: AuthService) {
    if (authService.isLogged) {
      this.goToLabel = 'Go To Personal Area';
    } else {
      this.goToLabel = 'Go To Login';
    }
  }

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  goPersonalArea(): void {
    if (this.authService.isLogged) {
      this.router.navigate(['/cms']);
    } else {
      this.router.navigate(['login']);
    }
  }
}
