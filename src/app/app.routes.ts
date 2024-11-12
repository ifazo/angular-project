import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { OrderComponent } from './pages/order/order.component';
import { HistoryComponent } from './pages/history/history.component';
import { authGuard } from './guard/auth.guard';

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
        path: 'categories',
        component: CategoriesComponent,
        title: 'Categories | angular',
      },
      { path: 'blogs', component: BlogsComponent, title: 'Blogs | angular' },
      { path: 'sign-in', component: SignInComponent, title: 'Sign in | angular' },
      { path: 'sign-up', component: SignUpComponent, title: 'Sign up | angular' },
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
        path: 'profile',
        component: ProfileComponent,
        title: 'Profile | angular',
      },
      {
        path: 'orders',
        component: OrderComponent,
        title: 'Order | angular',
      },
      {
        path: 'history',
        component: HistoryComponent,
        title: 'History | angular',
      },
    ]
  },
];
