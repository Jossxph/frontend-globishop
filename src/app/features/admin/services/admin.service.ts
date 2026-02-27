import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private http = inject(HttpClient);

  // --- DASHBOARD ---
  getStats(): Observable<any> {
    return this.http.get<any>(API_ROUTES.admin.stats);
  }

  // --- GESTIÓN DE PRODUCTOS ---
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.products.admin);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.products.admin, data);
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.products.admin}/${id}`, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete<any>(`${API_ROUTES.products.admin}/${id}`);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.products.admin}/categories`);
  }

  createCategory(data: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.admin.categories, data);
  }

  updateCategory(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.admin.categories}/${id}`, data);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete<any>(`${API_ROUTES.admin.categories}/${id}`);
  }

  // --- GESTIÓN DE PEDIDOS ---
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.orders.admin);
  }

  getOrderStatuses(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.orders.admin}/statuses`);
  }

  updateOrderStatus(orderId: number, statusId: number): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.orders.admin}/${orderId}/status`, { estadoId: statusId });
  }

  getOrderDetails(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.orders.admin}/${orderId}/details`);
  }

  // --- GESTIÓN DE USUARIOS ---
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.adminUsers.base);
  }

  toggleUserStatus(userId: number): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.adminUsers.base}/${userId}/toggle-status`, {});
  }
}
