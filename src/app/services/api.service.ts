import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) { }

  createPayment(products: any[], name: string, email: string) {
    return this._httpClient.post(`${environment.apiUrl}/payment`, { products, name, email});
  }

  getPaginatedProducts(skip: number) {
    return this._httpClient.get(
      `${environment.apiUrl}/products?skip=${skip}&limit=${12}`
    );
  }

  getRandomProducts() {
    return this._httpClient.get(`${environment.apiUrl}/products/random`);
  }

  getProducts() {
    return this._httpClient.get(`${environment.apiUrl}/products`);
  }

  getProduct(id: string | null) {
    return this._httpClient.get(`${environment.apiUrl}/products/` + id);
  }

  addProduct(product: any) {
    return this._httpClient.post(`${environment.apiUrl}/products`, product);
  }

  updateProduct(product: any) {
    return this._httpClient.put(
      `${environment.apiUrl}/products/` + product.id,
      product
    );
  }

  deleteProduct(product: any) {
    return this._httpClient.delete(
      `${environment.apiUrl}/products/` + product.id
    );
  }

  getCategories() {
    return this._httpClient.get(`${environment.apiUrl}/categories`);
  }

  getProductsByCategory(slug: string | null) {
    return this._httpClient.get(
      `${environment.apiUrl}/products?category=${slug}`
    );
  }

  addCategory(category: any) {
    return this._httpClient.post(`${environment.apiUrl}/categories`, category);
  }

  updateCategory(category: any) {
    return this._httpClient.put(
      `${environment.apiUrl}/categories/` + category.id,
      category
    );
  }

  deleteCategory(category: any) {
    return this._httpClient.delete(
      `${environment.apiUrl}/categories/` + category.id
    );
  }

  getLogin() {
    return this._httpClient.get(`${environment.apiUrl}/login`);
  }

  getRegister() {
    return this._httpClient.get(`${environment.apiUrl}/register`);
  }

  getCart() {
    return this._httpClient.get(`${environment.apiUrl}/cart`);
  }

  getProfile() {
    return this._httpClient.get(`${environment.apiUrl}/profile`);
  }

}
