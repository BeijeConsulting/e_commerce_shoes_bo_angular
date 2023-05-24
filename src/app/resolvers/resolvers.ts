import { ActivatedRouteSnapshot } from '@angular/router';
import { ProductService } from '../services/product/product.service';
import { inject } from '@angular/core';
import { forkJoin } from 'rxjs';
// Users Services
import { UserService } from '../services/user/user.service';
// Orders Services
import { OrderService } from '../services/order/order.service';
// Sizes Service
import { SizeService } from '../services/size/size.service';
import { CouponService } from '../services/coupon/coupon.service';
import { ColorService } from '../services/color/color.service';
import { CategoryService } from '../services/category/category.service';
import { BrandService } from '../services/brand/brand.service';

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

export const getAllOrdersResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const ordersService = inject(OrderService);
  return ordersService.getOrders();
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

export const addProductsResolverFn = () => {
  console.log('Resolver Activated');

  const sizeService = inject(SizeService);
  const brandService = inject(BrandService);
  const colorService = inject(ColorService);
  const categoryService = inject(CategoryService);

  return forkJoin({
    sizes: sizeService.getSizes(),
    colors: colorService.getColors('en'),
    brands: brandService.getBrands(),
    categories: categoryService.getCategories('en'),
  });
};

export const updateProductsResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const productService = inject(ProductService);
  const sizeService = inject(SizeService);
  const brandService = inject(BrandService);
  const colorService = inject(ColorService);
  const categoryService = inject(CategoryService);

  return forkJoin({
    product: productService.getSingleProduct(route.params['id']),
    sizes: sizeService.getSizes(),
    colors: colorService.getColors('en'),
    brands: brandService.getBrands(),
    categories: categoryService.getCategories('en'),
  });
};

// Coupons
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

// Sizes
export const getSizesResolverFn = (route: ActivatedRouteSnapshot) => {
  console.log('Resolver Activated');
  const sizesService = inject(SizeService);
  return sizesService.getSizes();
};
