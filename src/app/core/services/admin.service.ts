import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/admin';

  // --- DASHBOARD ---
  getStats(): Observable<any> { return this.http.get<any>(`${this.apiUrl}/stats`); }

  // --- GESTIÓN DE PRODUCTOS ---
  getProducts(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/products`); }

  createProduct(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/products`, data); }

  updateProduct(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/products/${id}`, data); }

  deleteProduct(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/products/${id}`); }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/categories`);
  }

  createCategory(data: any) {
    return this.http.post(`${this.apiUrl}/categories`, data);
  }

  updateCategory(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/categories/${id}`, data);
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  // --- GESTIÓN DE PEDIDOS ---
  getOrders(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/orders`); }

  getOrderStatuses(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/orders/statuses`); }

  updateOrderStatus(orderId: number, statusId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, { estadoId: statusId });
  }
  getOrderDetails(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders/${orderId}/details`);
  }

  // --- GESTIÓN DE USUARIOS ---
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  toggleUserStatus(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/toggle-status`, {});
  }
}
