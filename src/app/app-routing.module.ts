import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Screens
import { LoginComponent } from './screens/login/login.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ProductsComponent } from './screens/products/products.component';
import { DetailProductComponent } from './screens/detail-product/detail-product.component';
import { AddProductsComponent } from './screens/add-products/add-products.component';
import { EditProductComponent } from './screens/edit-product/edit-product.component';
import { UsersComponent } from './screens/users/users.component';
import { AddUserComponent } from './screens/add-user/add-user.component';
import { EditUserComponent } from './screens/edit-user/edit-user.component';
import { DetailUserComponent } from './screens/detail-user/detail-user.component';
import { CouponsComponent } from './screens/coupons/coupons.component';
import { AddCouponComponent } from './screens/add-coupon/add-coupon.component';
import { EditCouponComponent } from './screens/edit-coupon/edit-coupon.component';
import { DetailCouponComponent } from './screens/detail-coupon/detail-coupon.component';
import { OrdersComponent } from './screens/orders/orders.component';
import { AddOrderComponent } from './screens/add-order/add-order.component';
import { EditOrderComponent } from './screens/edit-order/edit-order.component';
import { DetailOrderComponent } from './screens/detail-order/detail-order.component';
import { PersonalAreaComponent } from './screens/personal-area/personal-area.component';
import { PersonalAddressesComponent } from './screens/personal-addresses/personal-addresses.component';
import { AddPersonalAddressComponent } from './screens/add-personal-address/add-personal-address.component';
import { EditPersonalAddressComponent } from './screens/edit-personal-address/edit-personal-address.component';
import { CmsComponent } from './screens/cms/cms.component';
import {
  getCouponsResolverFn,
  getEditCouponDetailsResolverFn,
  getAllOrdersResolverFn,
  getOrderByIdResolverFn,
  getOrdersResolverFn,
  getProductsResolverFn,
  getSingleCouponResolverFn,
  getSingleProductResolverFn,
  getUsersResolverFn,
  addProductsResolverFn,
  updateProductsResolverFn,
} from './resolvers/resolvers';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: CmsComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        resolve: { dashboardResolver: getAllOrdersResolverFn },
      },
      {
        path: 'products',
        component: ProductsComponent,
        resolve: { productsResolver: getProductsResolverFn },
      },
      {
        path: 'products/detail-product/:id',
        component: DetailProductComponent,
        resolve: { productsResolver: getSingleProductResolverFn },
      },
      {
        path: 'products/add-product',
        component: AddProductsComponent,
        resolve: { addProductsResolver: addProductsResolverFn },
      },
      {
        path: 'products/edit-product/:id',
        component: EditProductComponent,
        resolve: { updateProductsResolver: updateProductsResolverFn },
      },
      {
        path: 'users',
        component: UsersComponent,
        resolve: { usersResolver: getUsersResolverFn },
      },
      {
        path: 'users/add-user',
        component: AddUserComponent,
      },
      {
        path: 'users/edit-user/:id',
        component: EditUserComponent,
      },
      {
        path: 'users/detail-user/:id',
        component: DetailUserComponent,
      },
      {
        path: 'coupons',
        component: CouponsComponent,
        resolve: { couponsResolver: getCouponsResolverFn },
      },
      {
        path: 'coupons/add-coupon',
        component: AddCouponComponent,
      },
      {
        path: 'coupons/edit-coupon/:id',
        component: EditCouponComponent,
        resolve: { couponEditDetailsResolver: getEditCouponDetailsResolverFn },
      },
      {
        path: 'coupons/detail-coupon/:id',
        component: DetailCouponComponent,
        resolve: { couponsDetailResolver: getSingleCouponResolverFn },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        resolve: { ordersResolver: getOrdersResolverFn },
      },
      {
        path: 'orders/add-order',
        component: AddOrderComponent,
      },
      {
        path: 'orders/edit-order/:id',
        component: EditOrderComponent,
      },
      {
        path: 'orders/detail-order/:id',
        component: DetailOrderComponent,
        resolve: { ordersResolver: getOrderByIdResolverFn },
      },
      {
        path: 'personal-area',
        component: PersonalAreaComponent,
      },
      {
        path: 'personal-area/addresses',
        component: PersonalAddressesComponent,
      },
      {
        path: 'personal-area/add-address',
        component: AddPersonalAddressComponent,
      },
      {
        path: 'personal-area/edit-address/:id',
        component: EditPersonalAddressComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
