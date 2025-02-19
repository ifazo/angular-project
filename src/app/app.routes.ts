import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { OrderComponent } from './pages/order/order.component';
import { authGuard } from './guard/auth.guard';
import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { CartComponent } from './pages/cart/cart.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { SuccessComponent } from './pages/success/success.component';
import { CancelComponent } from './pages/cancel/cancel.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        title: 'Home | angular',
      },
      {
        path: 'products',
        component: ProductsComponent,
        title: 'Products | angular',
      },
      {
        path: 'products/:id',
        component: ProductComponent,
        title: 'Product | angular',
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories | angular',
      },
      {
        path: 'categories/:slug',
        component: CategoryComponent,
        title: 'Category | angular',
      },
      {
        path: 'sign-in',
        component: SignInComponent,
        title: 'Sign in | angular',
      },
      {
        path: 'sign-up',
        component: SignUpComponent,
        title: 'Sign up | angular',
      },
    ],
  },
  {
    path: 'dashboard',
    component: DashboardLayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
        title: 'Dashboard | angular',
      },
      {
        path: 'cart',
        component: CartComponent,
        title: 'Cart | angular',
      },
      {
        path: 'orders',
        component: OrderComponent,
        title: 'Order | angular',
      },
    ],
  },
  {
    path: 'success',
    component: SuccessComponent,
    title: 'Success | angular',
  },
  {
    path: 'cancel',
    component: CancelComponent,
    title: 'Cancel | angular',
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'Not found | angular',
    pathMatch: 'full',
  },
];
