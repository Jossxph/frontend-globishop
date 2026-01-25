import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  // # INYECCION DEL CLIENTE HTTP PARA REALIZAR PETICIONES
  private http = inject(HttpClient);

  // # URL BASE DEL ENDPOINT PÚBLICO DE CATEGORIAS
  private apiUrl = 'http://localhost:8080/categorias';

  // # OBTIENE EL LISTADO COMPLETO DE CATEGORIAS DESDE EL BACKEND
  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}