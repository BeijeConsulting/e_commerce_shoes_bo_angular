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
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
      {
        path: 'products/product/detail-product/:id',
        component: DetailProductComponent,
      },
      {
        path: 'products/product/add-product/',
        component: AddProductsComponent,
      },
      {
        path: 'products/product/edit-product/:id',
        component: EditProductComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
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
      },
      {
        path: 'coupons/add-coupon',
        component: AddCouponComponent,
      },
      {
        path: 'coupons/edit-coupon/:id',
        component: EditCouponComponent,
      },
      {
        path: 'coupons/detail-coupon/:id',
        component: DetailCouponComponent,
      },
      {
        path: 'orders',
        component: OrdersComponent,
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
      },
      {
        path: 'personal-area',
        component: PersonalAreaComponent,
      },
      {
        path: 'personal-area/address',
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
