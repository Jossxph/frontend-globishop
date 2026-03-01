import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { API_ROUTES } from '../api/api-routes';

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
    return this.http.post<any>(API_ROUTES.auth.login, credentials).pipe(
      tap((response: any) => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));
        this.currentUserSubject.next(response);
      })
    );
  }

  register(userData: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.register, userData);
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
    return this.http.post<any>(API_ROUTES.auth.recoverPassword, { email });
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
      this.logout();
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ CORREGIDO: el backend devuelve 'ROL_ADMIN' no 'ADMIN'
  isAdmin(): boolean {
    const userStr = localStorage.getItem('user');
    if (!userStr) return false;
    try {
      const user = JSON.parse(userStr);
      return user.rol === 'ROL_ADMIN';
    } catch (e) {
      return false;
    }
  }

  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.recoverPassword, { email });
  }

  verifyRecoveryCode(email: string, code: string): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.verifyCode, { email, code });
  }

  resetPassword(email: string, code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.resetPassword, { email, code, newPassword });
  }
}