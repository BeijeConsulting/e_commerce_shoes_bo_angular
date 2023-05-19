import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';

export const getUsersResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const userService = inject(UserService);
  return userService.getUsers(1, 8);
};
