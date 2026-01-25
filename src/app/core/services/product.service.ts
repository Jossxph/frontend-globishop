import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

const API_URL = 'http://localhost:8080/api/public/products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private http = inject(HttpClient);

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(API_URL);
  }

  getFeatured(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/destacados`);
  }

  search(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/search?q=${term}`);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${API_URL}/${id}`);
  }

  getReviews(productId: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/api/reviews/product/${productId}`);
  }

  addReview(reviewData: any): Observable<any> {
    return this.http.post(`http://localhost:8080/api/reviews/create`, reviewData);
  }

  checkEligibility(productId: number): Observable<boolean> {
    return this.http.get<boolean>(`http://localhost:8080/api/reviews/can-review/${productId}`);
  }

  searchProducts(term: string): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}`).pipe(
      map(products => products.filter(p => p.nombre.toLowerCase().includes(term.toLowerCase())))
    );
  }
}