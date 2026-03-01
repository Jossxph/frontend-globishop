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

  createOrder(orderData: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.orders.base, orderData);
  }

  requestRefund(orderId: number): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.orders.base}/${orderId}/devolucion`, {});
  }

  downloadBoleta(orderId: number): Observable<Blob> {
    return this.http.get(`${API_ROUTES.orders.base}/${orderId}/boleta`, {
      responseType: 'blob'
    });
  }
}