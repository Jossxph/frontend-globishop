import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';
import { AuthService } from '../../../core/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  private getUserId(): number | null {
    const user = this.authService.getUser();
    return user?.userId || user?.id || null;
  }

  getProfile(): Observable<any> {
    return this.http.get<any>(API_ROUTES.profile.me);
  }

  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.profile.orders);
  }

  getOrderDetail(id: number): Observable<any> {
    return this.http.get<any>(`${API_ROUTES.profile.orders}/${id}`);
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.profile.favorites);
  }

  toggleFavorite(productoId: number): Observable<any> {
    return this.http.post(`${API_ROUTES.profile.favorites}/${productoId}`, {});
  }

  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.profile.reviews);
  }

  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(API_ROUTES.profile.update, data);
  }

  deleteAccount(): Observable<any> {
    return this.http.delete<any>(API_ROUTES.profile.delete);
  }

  changePassword(data: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.profile.changePassword, data);
  }

  requestEmailChange(): Observable<any> {
    return this.http.post<any>(API_ROUTES.profile.requestEmailChange, {});
  }

  confirmEmailChange(data: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.profile.confirmEmailChange, data);
  }

  // ✅ CORREGIDO: el backend requiere ?usuarioId=X como @RequestParam
  deleteReview(reviewId: number): Observable<any> {
    const usuarioId = this.getUserId();
    return this.http.delete<any>(
      `${API_ROUTES.reviews.base}/delete/${reviewId}?usuarioId=${usuarioId}`
    );
  }
}