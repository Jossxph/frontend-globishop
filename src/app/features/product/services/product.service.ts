import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.products.public);
  }

  getFeatured(): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.products.public}/destacados`);
  }

  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.products.public}/search?q=${term}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${API_ROUTES.products.public}/${id}`);
  }

  getReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`${API_ROUTES.reviews.base}/product/${productId}`);
  }

  addReview(reviewData: any): Observable<any> {
    return this.http.post<any>(`${API_ROUTES.reviews.base}/create`, reviewData);
  }

  // ✅ CORREGIDO: envía usuarioId como @RequestParam
  checkEligibility(productId: number, usuarioId: number): Observable<any> {
    return this.http.get<any>(`${API_ROUTES.reviews.base}/can-review/${productId}?usuarioId=${usuarioId}`);
  }

  searchProducts(term: string): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.products.public).pipe(
      map(products => products.filter(p => p.nombre.toLowerCase().includes(term.toLowerCase())))
    );
  }
}