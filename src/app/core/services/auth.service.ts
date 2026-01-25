import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  login(credentials: any): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, userData);
  }
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.currentUserSubject.next(null);
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${API_URL}/forgot-password`, { email });
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUser(): any {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    try {
      return JSON.parse(userStr);
    } catch (e) {
      console.error('Datos de usuario corruptos, cerrando sesión...');
      this.logout();
      return null;
    }

  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      return false;
    }

    try {
      const user = JSON.parse(userStr);

      return user.rol === 'ADMIN';

    } catch (e) {
      console.error('Error al leer usuario', e);
      return false;
    }
  }

  recoverPassword(email: string) {
    return this.http.post(`${API_URL}/recover-password`, { email });
  }
  verifyRecoveryCode(email: string, code: string) {
    return this.http.post(`${API_URL}/verify-code`, { email, code });
  }

  resetPassword(email: string, code: string, newPassword: string) {
    return this.http.post(`${API_URL}/reset-password`, { email, code, newPassword });
  }
} 