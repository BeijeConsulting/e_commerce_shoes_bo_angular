import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';

export const getUsersResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const userService = inject(UserService);

  userService.userTableDataState = { page: 1, size: 10 };
  userService.employeesTableDataState = { page: 1, size: 10 };

  console.log('UserServiceData from resolver: ', userService);

  return forkJoin({
    users: userService.getUsers(1, 10, false),
    employees: userService.getUsers(1, 10, true),
  });
};
