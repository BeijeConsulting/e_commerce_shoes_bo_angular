import { ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { ProductService } from '../services/product/product.service';
import { inject } from '@angular/core';

export const getUsersResolverFn = () => {
  console.log('Resolver Activated');
  const userService = inject(UserService);
  return userService.getUsers(1, 8);
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
