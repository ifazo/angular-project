import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable, switchMap } from 'rxjs';
import { UserState } from '../stores/user/user.reducer';
import { Store } from '@ngrx/store';
import { selectUser } from '../stores/user/user.selectors';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  user$!: Observable<any>;

  constructor(private httpClient: HttpClient, private userStore: Store<UserState>) { 
    this.user$ = this.userStore.select(selectUser);
  }

  getOrders() {
    return this.user$.pipe(
      switchMap(user => this.httpClient.get(`${environment.apiUrl}/orders?email=${user.email}`))
    );
  }

  createPayment(products: any[], name: string, email: string) {
    return this.httpClient.post(`${environment.apiUrl}/payment`, { products, name, email});
  }

  getPaginatedProducts(skip: number) {
    return this.httpClient.get(
      `${environment.apiUrl}/products?skip=${skip}&limit=${12}`
    );
  }

  getRandomProducts() {
    return this.httpClient.get(`${environment.apiUrl}/products/random`);
  }

  getProducts() {
    return this.httpClient.get(`${environment.apiUrl}/products`);
  }

  getProduct(id: string | null) {
    return this.httpClient.get(`${environment.apiUrl}/products/` + id);
  }

  addProduct(product: any) {
    return this.httpClient.post(`${environment.apiUrl}/products`, product);
  }

  updateProduct(product: any) {
    return this.httpClient.put(
      `${environment.apiUrl}/products/` + product.id,
      product
    );
  }

  deleteProduct(product: any) {
    return this.httpClient.delete(
      `${environment.apiUrl}/products/` + product.id
    );
  }

  getCategories() {
    return this.httpClient.get(`${environment.apiUrl}/categories`);
  }

  getProductsByCategory(slug: string | null) {
    return this.httpClient.get(
      `${environment.apiUrl}/products?category=${slug}`
    );
  }

  addCategory(category: any) {
    return this.httpClient.post(`${environment.apiUrl}/categories`, category);
  }

  updateCategory(category: any) {
    return this.httpClient.put(
      `${environment.apiUrl}/categories/` + category.id,
      category
    );
  }

  deleteCategory(category: any) {
    return this.httpClient.delete(
      `${environment.apiUrl}/categories/` + category.id
    );
  }

  getLogin() {
    return this.httpClient.get(`${environment.apiUrl}/login`);
  }

  getRegister() {
    return this.httpClient.get(`${environment.apiUrl}/register`);
  }

  getCart() {
    return this.httpClient.get(`${environment.apiUrl}/cart`);
  }

  getProfile() {
    return this.httpClient.get(`${environment.apiUrl}/profile`);
  }

}
