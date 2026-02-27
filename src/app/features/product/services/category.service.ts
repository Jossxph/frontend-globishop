import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from '../../../core/api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private http = inject(HttpClient);

  // # OBTIENE EL LISTADO COMPLETO DE CATEGORIAS DESDE EL BACKEND
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(API_ROUTES.categories.public);
  }
}
