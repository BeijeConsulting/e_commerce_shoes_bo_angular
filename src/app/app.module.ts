import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './screens/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

// Interceptors
import { interceptorProvider } from './interceptor';

// Screens
import { DynamicFormInputComponent } from './components/dynamic-form-input/dynamic-form-input.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DashboardComponent } from './screens/dashboard/dashboard.component';
import { ProductsComponent } from './screens/products/products.component';
import { CmsComponent } from './screens/cms/cms.component';
import { AddProductsComponent } from './screens/add-products/add-products.component';
import { EditProductComponent } from './screens/edit-product/edit-product.component';
import { DetailProductComponent } from './screens/detail-product/detail-product.component';
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
import { CardComponent } from './components/cardOrders/cardOrder.component';
import { CardProductComponent } from './components/card-product/card-product.component';
import { CardUserComponent } from './components/card-user/card-user.component';
import { CardCouponComponent } from './components/card-coupon/card-coupon.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { PieChartComponent } from './components/pie-chart/pie-chart.component';
import { TableComponent } from './components/coupon-table/coupon-table.component';
import { MenuProfileComponent } from './components/menu-profile/menu-profile.component';
import { ButtonComponent } from './components/button/button.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { LoaderComponent } from './components/loader/loader.component';
import { TabComponent } from './components/tab/tab.component';
import { DialogLogoutComponent } from './components/dialog-logout/dialog-logout.component';

// Angular Material
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SizeTableComponent } from './components/size-table/size-table.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { UserTableComponent } from './components/user-table/user-table.component';

function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DynamicFormInputComponent,
    DynamicFormComponent,
    DashboardComponent,
    ProductsComponent,
    CmsComponent,
    AddProductsComponent,
    EditProductComponent,
    DetailProductComponent,
    UsersComponent,
    AddUserComponent,
    EditUserComponent,
    DetailUserComponent,
    CouponsComponent,
    AddCouponComponent,
    EditCouponComponent,
    DetailCouponComponent,
    OrdersComponent,
    AddOrderComponent,
    EditOrderComponent,
    DetailOrderComponent,
    PersonalAreaComponent,
    PersonalAddressesComponent,
    AddPersonalAddressComponent,
    EditPersonalAddressComponent,
    TableComponent,
    ButtonComponent,
    MenuProfileComponent,
    DialogComponent,
    LoaderComponent,
    CardComponent,
    CardProductComponent,
    CardUserComponent,
    CardCouponComponent,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    SizeTableComponent,
    TabComponent,
    DialogLogoutComponent,
    ProductTableComponent,
    UserTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatSelectModule,
    MatSidenavModule,
    MatIconModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    MatTableModule,
    MatPaginatorModule,
    MatMenuModule,
    MatDialogModule,
    MatCardModule,
    MatTabsModule,
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
})
export class AppModule {}
