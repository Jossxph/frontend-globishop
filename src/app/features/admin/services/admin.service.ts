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

  toggleProduct(id: number): Observable<any> {
    return this.http.patch<any>(`${API_ROUTES.products.admin}/${id}/toggle`, {});
  }

  getProductCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.products.admin}/categories`);
  }

  // --- GESTIÓN DE CATEGORÍAS ---
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.admin.categories);
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

  // ✅ Estados exactos como están en la BD
  getOrderStatuses(): Observable<any[]> {
    return new Observable(observer => {
      observer.next([
        { estadoId: 1, nombre: 'PENDIENTE' },
        { estadoId: 2, nombre: 'PAGADO' },
        { estadoId: 3, nombre: 'PROCESANDO' },
        { estadoId: 4, nombre: 'ENVIADO' },
        { estadoId: 5, nombre: 'ENTREGADO' },
        { estadoId: 6, nombre: 'CANCELADO' },
      ]);
      observer.complete();
    });
  }

  // ✅ PUT /api/admin/orders/{id}/estado/{estadoId}
  updateOrderStatus(orderId: number, statusId: number): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.orders.admin}/${orderId}/estado/${statusId}`, {});
  }

  // ✅ GET /api/orders/{id}/details
  getOrderDetails(orderId: number): Observable<any> {
    return this.http.get<any>(`${API_ROUTES.orders.base}/${orderId}/details`);
  }

  // --- GESTIÓN DE USUARIOS ---
  getUsers(search?: string): Observable<any[]> {
    const url = search
      ? `${API_ROUTES.adminUsers.base}?search=${search}`
      : API_ROUTES.adminUsers.base;
    return this.http.get<any[]>(url);
  }

  toggleUserStatus(userId: number): Observable<any> {
    return this.http.put<any>(`${API_ROUTES.adminUsers.base}/${userId}/toggle-status`, {});
  }

  assignPoints(userId: number, puntos: number): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.adminUsers.base}/${userId}/points`, { puntos });
  }
}