import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { inject } from '@angular/core';
// Users Services
import { UserService } from '../services/user/user.service';
// Orders Services
import { OrderService } from '../services/order/order.service';

export const getUsersResolverFn = () => {
  console.log('Resolver Activated');
  const userService = inject(UserService);
  return userService.getUsers(1, 8);
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
