import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { BlogsComponent } from './pages/blogs/blogs.component';
import { ProductsComponent } from './pages/products/products.component';
import { CategoriesComponent } from './pages/categories/categories.component';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Home | angular' },
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
  { path: 'about', component: AboutComponent, title: 'About | angular' },
];
