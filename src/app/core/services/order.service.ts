import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  // # INYECCION DEL CLIENTE HTTP
  private http = inject(HttpClient);
  // # URL BASE PARA LAS ORDENES EN EL BACKEND
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor() { }

  // # ENVIA LA DATA DEL CARRITO Y CLIENTE PARA GENERAR UNA ORDEN DE COMPRA
  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  // # SOLICITA EL REEMBOLSO DE UNA ORDEN ESPECIFICA VALIDANDO UN CODIGO UNICO
  refundOrder(orderId: number, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/refund`, { codigo: code });
  }

  // # RECUPERA EL HISTORIAL DE COMPRAS DEL USUARIO AUTENTICADO
  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`);
  }

  // # DESCARGA LA FACTURA DEL SERVIDOR
  // # IMPORTANTE: 'responseType: blob' INDICA QUE LA RESPUESTA ES UN ARCHIVO BINARIO (PDF)
  downloadInvoice(orderId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${orderId}/invoice`, {
      responseType: 'blob'
    });
  }
}