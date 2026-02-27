import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private http = inject(HttpClient);

  // # OBTIENE TODOS LOS DATOS DEL USUARIO LOGUEADO
  getProfile(): Observable<any> {
    return this.http.get<any>(API_ROUTES.profile.me);
  }

  // # OBTIENE EL HISTORIAL COMPLETO DE COMPRAS DEL USUARIO
  getOrders(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.profile.orders);
  }

  // # TRAE LA LISTA DE PRODUCTOS MARCADOS COMO FAVORITOS
  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.profile.favorites);
  }

  // # ACCION DE DAR/QUITAR LIKE A UN PRODUCTO (TOGGLE)
  toggleFavorite(productoId: number): Observable<any> {
    return this.http.post(`${API_ROUTES.profile.favorites}/${productoId}`, {});
  }

  // # OBTIENE TODAS LAS RESEÑAS QUE EL USUARIO HA ESCRITO
  getReviews(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.profile.reviews);
  }

  // # OBTIENE EL DETALLE DE UNA ORDEN ESPECIFICA
  getOrderDetail(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.profile.orders}/${id}`);
  }

  // # ENVIA LOS CAMBIOS EDITADOS DEL PERFIL AL BACKEND
  updateProfile(data: any): Observable<any> {
    return this.http.put<any>(API_ROUTES.profile.update, data);
  }

  // # ELIMINA PERMANENTEMENTE LA CUENTA DEL USUARIO
  deleteAccount(): Observable<any> {
    return this.http.delete<any>(API_ROUTES.profile.delete);
  }

  // # ACTUALIZA LA CONTRASEÑA
  changePassword(data: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.profile.changePassword, data);
  }

  // # INICIA EL CAMBIO DE EMAIL
  requestEmailChange(): Observable<any> {
    return this.http.post<any>(API_ROUTES.profile.requestEmailChange, {});
  }

  // # FINALIZA EL CAMBIO DE EMAIL ENVIANDO EL CODIGO RECIBIDO
  confirmEmailChange(data: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.profile.confirmEmailChange, data);
  }

  // # ELIMINA UNA RESEÑA PROPIA USANDO SU ID
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete<any>(`${API_ROUTES.reviews.base}/delete/${reviewId}`);
  }
}
