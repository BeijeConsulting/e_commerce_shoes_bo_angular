import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';

export const getUsersResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const userService = inject(UserService);

  return forkJoin({
    users: userService.getUsers(1, 10, false),
    employees: userService.getUsers(1, 10, true),
  });
};
