import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const isLoggedGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLogged) {
    router.navigate(['login']);
    return false;
  }

  return true;
};

export const permissionsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const permissions: string[] = route.data['permissions'];

  console.log('permissions passed by route: ', permissions);
  console.log('User role: ', authService.userRole);

  if (!authService.userRole) return false;

  if (!permissions.some((value) => authService.userRole?.includes(value))) {
    console.log('NOT ALLOWED');
    router.navigate(['/not-allowed']);
    return false;
  }

  return true;
};
