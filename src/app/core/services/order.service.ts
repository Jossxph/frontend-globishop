import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/orders';

  constructor() { }

  createOrder(orderData: any): Observable<any> {
    return this.http.post(this.apiUrl, orderData);
  }

  refundOrder(orderId: number, code: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orderId}/refund`, { codigo: code });
  }

  getMyOrders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/my-orders`);
  }

  downloadInvoice(orderId: number): Observable<Blob> {
    return this.http.get(`${this.apiUrl}/${orderId}/invoice`, {
      responseType: 'blob'
    });
  }
}