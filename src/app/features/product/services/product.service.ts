import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  // # OBTIENE EL CATALOGO COMPLETO DE PRODUCTOS
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.products.public);
  }

  // # OBTIENE SOLO LOS PRODUCTOS MARCADOS COMO DESTACADOS (PARA EL HOME)
  getFeatured(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.products.public}/destacados`);
  }

  // # BUSQUEDA DIRECTA EN BASE DE DATOS (BACKEND) POR NOMBRE O QUERY
  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.products.public}/search?q=${term}`);
  }

  // # TRAE EL DETALLE DE UN PRODUCTO ESPECIFICO POR ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${API_ROUTES.products.public}/${id}`);
  }

  // --- SECCION DE RESEÑAS (REVIEWS) ---

  // # OBTIENE LA LISTA DE OPINIONES DE UN PRODUCTO
  getReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.reviews.base}/product/${productId}`);
  }

  // # ENVIA UNA NUEVA RESEÑA A LA BD
  addReview(reviewData: any): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.reviews.base}/create`, reviewData);
  }

  // # VERIFICA SI EL USUARIO ACTUAL PUEDE DEJAR REVIEW (SI YA COMPRÓ EL PRODUCTO)
  checkEligibility(productId: number): Observable<boolean> {
    return this.http.get<boolean>(`${API_ROUTES.reviews.base}/can-review/${productId}`);
  }

  // --- FILTROS CLIENT-SIDE ---

  // # BUSQUEDA LOCAL: DESCARGA TODO Y FILTRA EN EL NAVEGADOR
  searchProducts(term: string): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.products.public).pipe(
      map(products => products.filter(p => p.nombre.toLowerCase().includes(term.toLowerCase())))
    );
  }
}
