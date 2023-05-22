import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
// Users Services
import { UserService } from '../services/user/user.service';
// Orders Services
import { OrderService } from '../services/order/order.service';
import { CouponService } from '../services/coupon/coupon.service';

export const getUsersResolverFn = () => {
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

// Orders
export const getOrdersResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver All Orders Activated');
  const ordersService = inject(OrderService);
  return ordersService.getOrdersPerPage(1, 5);
};

export const getOrderByIdResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Order By ID Activated');
  const ordersService = inject(OrderService);
  const id = route.params['id'];

  return ordersService.getOrderById(id);
};
// Products
export const getProductsResolverFn = () => {
  console.log('Resolver Activated');
  const productService = inject(ProductService);
  return productService.getProducts(1, 5, 'it');
};

export const getSingleProductResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const productService = inject(ProductService);
  return productService.getSingleProduct(route.params['id']);
};

export const getCouponsResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const couponService = inject(CouponService);
  return couponService.getCoupons(1, 10);
};

export const getSingleCouponResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const id = route.params['id'];
  const couponService = inject(CouponService);

  return couponService.getCouponById(id);
};

export const getEditCouponDetailsResolverFn = (
  route: ActivatedRouteSnapshot
) => {
  console.log('Resolver Activated');
  const id = route.params['id'];
  const couponService = inject(CouponService);

  return couponService.getCouponById(id);
};
