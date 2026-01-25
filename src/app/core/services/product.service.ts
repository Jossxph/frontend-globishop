import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

// # CONSTANTE CON LA URL BASE PUBLICA DE PRODUCTOS
const API_URL = 'http://localhost:8080/api/public/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // # INYECCION DEL CLIENTE HTTP
  private http = inject(HttpClient);

  // # OBTIENE EL CATALOGO COMPLETO DE PRODUCTOS
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  // # OBTIENE SOLO LOS PRODUCTOS MARCADOS COMO DESTACADOS (PARA EL HOME)
  getFeatured(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/destacados`);
  }

  // # BUSQUEDA DIRECTA EN BASE DE DATOS (BACKEND) POR NOMBRE O QUERY
  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/search?q=${term}`);
  }

  // # TRAE EL DETALLE DE UN PRODUCTO ESPECIFICO POR ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${id}`);
  }

  // --- SECCION DE RESEÑAS (REVIEWS) ---

  // # OBTIENE LA LISTA DE OPINIONES DE UN PRODUCTO
  getReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/reviews/product/${productId}`);
  }

  // # ENVIA UNA NUEVA RESEÑA A LA BD
  addReview(reviewData: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/reviews/create`, reviewData);
  }

  // # VERIFICA SI EL USUARIO ACTUAL PUEDE DEJAR REVIEW (SI YA COMPRÓ EL PRODUCTO)
  checkEligibility(productId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/reviews/can-review/${productId}`);
  }

  // --- FILTROS CLIENT-SIDE ---

  // # BUSQUEDA LOCAL: DESCARGA TODO Y FILTRA EN EL NAVEGADOR (USAR SOLO CON POCOS DATOS)
  searchProducts(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}`).pipe(
      map(products => products.filter(p => p.nombre.toLowerCase().includes(term.toLowerCase())))
    );
  }
}