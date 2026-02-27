import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);

  constructor() { }

  // # ENVIA LA DATA DEL CARRITO Y CLIENTE PARA GENERAR UNA ORDEN DE COMPRA
  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.orders.orders, orderData);
  }

  // # SOLICITA EL REEMBOLSO DE UNA ORDEN ESPECIFICA
  refundOrder(orderId: number, code: string): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.orders.orders}/${orderId}/refund`, { codigo: code });
  }

  // # RECUPERA EL HISTORIAL DE COMPRAS DEL USUARIO AUTENTICADO
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.orders.orders}/my-orders`);
  }

  // # DESCARGA LA FACTURA DEL SERVIDOR
  downloadInvoice(orderId: number): Observable<Blob> {
    return this.http.get(`${API_ROUTES.orders.orders}/${orderId}/invoice`, {
      responseType: 'blob'
    });
  }
}
