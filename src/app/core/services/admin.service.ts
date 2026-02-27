import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // INYECCION MODERNA DEL CLIENTE HTTP
  private http = inject(HttpClient);
  // URL BASE APUNTANDO AL CONTROLADOR DE ADMIN EN SPRING BOOT
  private apiUrl = 'http://localhost:8080/api/admin';

  // --- DASHBOARD ---
  // OBTIENE DATOS RESUMIDOS (VENTAS TOTALES, CLIENTES, ETC)
  getStats(): Observable<any> { return this.http.get<any>(`${this.apiUrl}/stats`); }

  // --- GESTIÓN DE PRODUCTOS ---
  // LISTA TODOS LOS PRODUCTOS PARA LA TABLA DE ADMIN
  getProducts(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/products`); }

  // ENVIA DATOS PARA CREAR UN NUEVO PRODUCTO
  createProduct(data: any): Observable<any> { return this.http.post(`${this.apiUrl}/products`, data); }

  // ACTUALIZA DATOS DE UN PRODUCTO POR SU ID
  updateProduct(id: number, data: any): Observable<any> { return this.http.put(`${this.apiUrl}/products/${id}`, data); }

  // ELIMINA UN PRODUCTO DE LA BASE DE DATOS
  deleteProduct(id: number): Observable<any> { return this.http.delete(`${this.apiUrl}/products/${id}`); }

  // OBTIENE LAS CATEGORIAS DISPONIBLES PARA ASIGNAR A PRODUCTOS
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/products/categories`);
  }

  // CREA UNA NUEVA CATEGORIA
  createCategory(data: any) {
    return this.http.post(`${this.apiUrl}/categories`, data);
  }

  // EDITA EL NOMBRE O DESCRIPCION DE UNA CATEGORIA
  updateCategory(id: number, data: any) {
    return this.http.put(`${this.apiUrl}/categories/${id}`, data);
  }

  // BORRA UNA CATEGORIA
  deleteCategory(id: number) {
    return this.http.delete(`${this.apiUrl}/categories/${id}`);
  }

  // --- GESTIÓN DE PEDIDOS ---
  // TRAE EL HISTORIAL COMPLETO DE ORDENES DE COMPRA
  getOrders(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/orders`); }

  // OBTIENE LISTA DE ESTADOS POSIBLES (EJ: PENDIENTE, ENVIADO)
  getOrderStatuses(): Observable<any[]> { return this.http.get<any[]>(`${this.apiUrl}/orders/statuses`); }

  // CAMBIA EL ESTADO DE UN PEDIDO ESPECIFICO
  updateOrderStatus(orderId: number, statusId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/orders/${orderId}/status`, { estadoId: statusId });
  }

  // MUESTRA QUE PRODUCTOS Y CANTIDADES TIENE UN PEDIDO
  getOrderDetails(orderId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/orders/${orderId}/details`);
  }

  // --- GESTIÓN DE USUARIOS ---
  // LISTA TODOS LOS CLIENTES REGISTRADOS
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  // ACTIVA O DESACTIVA (BANEA) A UN USUARIO SIN BORRARLO
  toggleUserStatus(userId: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/users/${userId}/toggle-status`, {});
  }
}