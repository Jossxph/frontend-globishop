import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  getProfile(): Observable<any> { return this.http.get<any>(API_URL); }
  getOrders(): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/orders`); }
  getFavorites(): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/favorites`); }
  toggleFavorite(productoId: number): Observable<any> {
    return this.http.post(`${API_URL}/favorites/${productoId}`, {});
  }
  getReviews(): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/reviews`); }
  getOrderDetail(id: number): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/orders/${id}`); }
  updateProfile(data: any): Observable<any> { return this.http.put(`${API_URL}/update`, data); }
  deleteAccount(): Observable<any> { return this.http.delete(`${API_URL}/delete`); }
  changePassword(data: any): Observable<any> { return this.http.post(`${API_URL}/change-password`, data); }
  requestEmailChange(): Observable<any> { return this.http.post(`${API_URL}/request-email-change`, {}); }
  confirmEmailChange(data: any): Observable<any> { return this.http.post(`${API_URL}/confirm-email-change`, data); }
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/reviews/delete/${reviewId}`);
  }
}