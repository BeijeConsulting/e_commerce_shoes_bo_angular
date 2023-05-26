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
  getEditOrderResolverFn,
  getPersonalDataResolverFn,
  getPersonalAddressesResolverFn,
  getPersonalAddressResolverFn,
  addProductsResolverFn,
  updateProductsResolverFn,
} from './resolvers/resolvers';
import { isLoggedGuard, permissionsGuard } from './routeGuards/routeGuards';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';
import { NotAllowedComponent } from './screens/not-allowed/not-allowed.component';

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
    path: 'cms',
    component: CmsComponent,
    canActivate: [isLoggedGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { permissions: ['ADMIN', 'MARKETING', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { dashboardResolver: getAllOrdersResolverFn },
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: { permissions: ['ADMIN', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { productsResolver: getProductsResolverFn },
      },
      {
        path: 'products/detail-product/:id',
        component: DetailProductComponent,
        data: { permissions: ['ADMIN', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { productsResolver: getSingleProductResolverFn },
      },
      {
        path: 'products/add-product',
        component: AddProductsComponent,
        data: { permissions: ['ADMIN', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { addProductsResolver: addProductsResolverFn },
      },
      {
        path: 'products/edit-product/:id',
        component: EditProductComponent,
        data: { permissions: ['ADMIN', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { updateProductsResolver: updateProductsResolverFn },
      },
      {
        path: 'users',
        component: UsersComponent,
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        resolve: { usersResolver: getUsersResolverFn },
      },
      {
        path: 'users/add-user',
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        component: AddUserComponent,
      },
      {
        path: 'users/edit-user/:id',
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        component: EditUserComponent,
      },
      {
        path: 'users/detail-user/:id',
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        component: DetailUserComponent,
      },
      {
        path: 'coupons',
        component: CouponsComponent,
        data: { permissions: ['ADMIN', 'MARKETING'] },
        canActivate: [permissionsGuard],
        resolve: { couponsResolver: getCouponsResolverFn },
      },
      {
        path: 'coupons/add-coupon',
        data: { permissions: ['ADMIN', 'MARKETING'] },
        canActivate: [permissionsGuard],
        component: AddCouponComponent,
      },
      {
        path: 'coupons/edit-coupon/:id',
        component: EditCouponComponent,
        data: { permissions: ['ADMIN', 'MARKETING'] },
        canActivate: [permissionsGuard],
        resolve: { couponEditDetailsResolver: getEditCouponDetailsResolverFn },
      },
      {
        path: 'coupons/detail-coupon/:id',
        component: DetailCouponComponent,
        data: { permissions: ['ADMIN', 'MARKETING'] },
        canActivate: [permissionsGuard],
        resolve: { couponsDetailResolver: getSingleCouponResolverFn },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { permissions: ['ADMIN', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { ordersResolver: getOrdersResolverFn },
      },
      {
        path: 'orders/add-order',
        component: AddOrderComponent,
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        resolve: { productsResolver: getProductsResolverFn },
      },
      {
        path: 'orders/edit-order/:id',
        component: EditOrderComponent,
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        resolve: { ordersResolver: getOrderByIdResolverFn },
      },
      {
        path: 'orders/detail-order/:id',
        component: DetailOrderComponent,
        data: { permissions: ['ADMIN'] },
        canActivate: [permissionsGuard],
        resolve: { ordersResolver: getOrderByIdResolverFn },
      },
      {
        path: '',
        component: PersonalAreaComponent,
        data: { permissions: ['ADMIN', 'MARKETING', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { personalDataResolver: getPersonalDataResolverFn },
      },
      {
        path: 'personal-area/addresses',
        component: PersonalAddressesComponent,
        data: { permissions: ['ADMIN', 'MARKETING', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        resolve: { personalAddressesResolver: getPersonalAddressesResolverFn },
      },
      {
        path: 'personal-area/add-address',
        data: { permissions: ['ADMIN', 'MARKETING', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        component: AddPersonalAddressComponent,
      },
      {
        path: 'personal-area/edit-address/:id',
        data: { permissions: ['ADMIN', 'MARKETING', 'DATA_ENTRY'] },
        canActivate: [permissionsGuard],
        component: EditPersonalAddressComponent,
        resolve: { personalAddressResolver: getPersonalAddressResolverFn },
      },
    ],
  },
  { path: 'not-allowed', component: NotAllowedComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
