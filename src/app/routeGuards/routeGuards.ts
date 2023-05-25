import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

export const loginGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  return authService.isLogged;
};

export const permissionsGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthService);
  const permissions: string[] = route.data['permissions'];

  console.log('permissions passed by route: ', permissions);
  console.log('User role: ', authService.userRole);

  if (!authService.userRole) return false;

  return permissions.some((value) => authService.userRole?.includes(value));
};
