import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// # URL BASE DEL ENDPOINT DE PERFIL DE USUARIO
const API_URL = 'http://localhost:8080/api/profile';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // # INYECCION DEL CLIENTE HTTP
  private http = inject(HttpClient);

  // # OBTIENE TODOS LOS DATOS DEL USUARIO LOGUEADO (NOMBRE, EMAIL, ETC)
  getProfile(): Observable<any> { return this.http.get<any>(API_URL); }

  // # OBTIENE EL HISTORIAL COMPLETO DE COMPRAS DEL USUARIO
  getOrders(): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/orders`); }

  // # TRAE LA LISTA DE PRODUCTOS MARCADOS COMO FAVORITOS
  getFavorites(): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/favorites`); }

  // # ACCION DE DAR/QUITAR LIKE A UN PRODUCTO (TOGGLE)
  toggleFavorite(productoId: number): Observable<any> {
    return this.http.post(`${API_URL}/favorites/${productoId}`, {});
  }

  // # OBTIENE TODAS LAS RESEÑAS QUE EL USUARIO HA ESCRITO
  getReviews(): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/reviews`); }

  // # OBTIENE EL DETALLE (PRODUCTOS Y CANTIDADES) DE UNA ORDEN ESPECIFICA
  getOrderDetail(id: number): Observable<any[]> { return this.http.get<any[]>(`${API_URL}/orders/${id}`); }

  // # ENVIA LOS CAMBIOS EDITADOS DEL PERFIL AL BACKEND
  updateProfile(data: any): Observable<any> { return this.http.put(`${API_URL}/update`, data); }

  // # ELIMINA PERMANENTEMENTE LA CUENTA DEL USUARIO
  deleteAccount(): Observable<any> { return this.http.delete(`${API_URL}/delete`); }

  // # ACTUALIZA LA CONTRASEÑA (REQUIERE LA ACTUAL Y LA NUEVA)
  changePassword(data: any): Observable<any> { return this.http.post(`${API_URL}/change-password`, data); }

  // # INICIA EL CAMBIO DE EMAIL (ENVIA UN CODIGO DE VERIFICACION)
  requestEmailChange(): Observable<any> { return this.http.post(`${API_URL}/request-email-change`, {}); }

  // # FINALIZA EL CAMBIO DE EMAIL ENVIANDO EL CODIGO RECIBIDO
  confirmEmailChange(data: any): Observable<any> { return this.http.post(`${API_URL}/confirm-email-change`, data); }

  // # ELIMINA UNA RESEÑA PROPIA USANDO SU ID
  deleteReview(reviewId: number): Observable<any> {
    return this.http.delete(`http://localhost:8080/api/reviews/delete/${reviewId}`);
  }
}