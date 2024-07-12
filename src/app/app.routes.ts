import { Router, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { AddProductComponent } from './admin/add-product/add-product.component';
import { AdminComponent } from './admin/admin.component';
import { OrdersTableComponent } from './admin/orders-table/orders-table.component';
import { ProductsTableComponent } from './admin/products-table/products-table.component';
import { CartComponent } from './product/cart/cart.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { HomeProductsComponent } from './product/home-products.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomeProductsComponent,
      },
      { path: 'cart', component: CartComponent },
      { path: 'product/:id', component: ProductDetailComponent },
      {
        component: RegisterComponent,
        path: 'register',
        canActivate: [
          () => {
            if (inject(CookieService).get('authenticated')) {
              inject(Router).navigate(['/']);
              return false;
            } else {
              return true;
            }
          },
        ],
      },

      {
        component: LoginComponent,
        path: 'login',
        canActivate: [
          () => {
            if (inject(CookieService).get('authenticated')) {
              inject(Router).navigate(['/']);
              return false;
            } else {
              return true;
            }
          },
        ],
      },
    ],
  },
  {
    path: 'user/:id',
    component: UserDashboardComponent,
    canActivate: [
      () => {
        if (
          inject(CookieService).get('authenticated') &&
          inject(CookieService).get('user')
        ) {
          return true;
        } else {
          inject(Router).navigate(['/login']);
          return false;
        }
      },
    ],
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [
      () => {
        if (
          inject(CookieService).get('authenticated') &&
          inject(CookieService).get('admin')
        ) {
          return true;
        } else {
          inject(Router).navigate(['/login']);
          return false;
        }
      },
    ],
    children: [
      { component: AddProductComponent, path: 'addProduct' },
      { component: ProductsTableComponent, path: 'productsTable' },
      { component: OrdersTableComponent, path: 'ordersTable' },
    ],
  },
];
