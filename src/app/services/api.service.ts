import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private _httpClient: HttpClient) { }

  getProducts() {
    return this._httpClient.get(`${environment.apiUrl}/products`);
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

  getBlogs() {
    return this._httpClient.get(`${environment.apiUrl}/blogs`);
  }

  addBlog(blog: any) {
    return this._httpClient.post(`${environment.apiUrl}/blogs`, blog);
  }

  updateBlog(blog: any) {
    return this._httpClient.put(`${environment.apiUrl}/blogs/` + blog.id, blog);
  }

  deleteBlog(blog: any) {
    return this._httpClient.delete(`${environment.apiUrl}/blogs/` + blog.id);
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
