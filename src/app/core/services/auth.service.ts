import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';

const API_URL = 'http://localhost:8080/api/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // ALMACENA EL ESTADO DEL USUARIO ACTUAL PARA QUE TODA LA APP LO VEA
  // SI RECARGAS LA PAGINA, LEE DE LOCALSTORAGE PARA NO PERDER LA SESION
  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  // OBSERVABLE PUBLICO PARA QUE OTROS COMPONENTES SE SUSCRIBAN A CAMBIOS DE USUARIO
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  // REALIZA LOGIN Y GUARDA TOKEN/USUARIO SI ES EXITOSO
  login(credentials: any): Observable<any> {
    return this.http.post(`${API_URL}/login`, credentials).pipe(
      tap((response: any) => {
        // GUARDA TOKEN JWT Y DATOS DEL USUARIO EN EL NAVEGADOR
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response));

        // NOTIFICA A TODA LA APP QUE HAY UN NUEVO USUARIO LOGUEADO
        this.currentUserSubject.next(response);
      })
    );
  }

  // REGISTRO DE NUEVOS CLIENTES
  register(userData: any): Observable<any> {
    return this.http.post(`${API_URL}/register`, userData);
  }

  // CIERRA SESION ELIMINANDO DATOS DEL NAVEGADOR
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // ACTUALIZA EL ESTADO A NULL (NADIE LOGUEADO)
    this.currentUserSubject.next(null);
  }

  // OBTIENE VALOR ACTUAL DEL USUARIO (SIN OBSERVABLE)
  get currentUserValue() {
    return this.currentUserSubject.value;
  }

  // SOLICITUD DE "OLVIDE MI CONTRASEÑA"
  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${API_URL}/forgot-password`, { email });
  }

  // VERIFICA SI HAY UN TOKEN GUARDADO (SI ESTA LOGUEADO)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // OBTIENE DATOS DEL USUARIO DE FORMA SEGURA (MANEJA ERRORES DE JSON)
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

  // ALIAS DE ISLOGGEDIN PARA GUARDS
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // VERIFICA SI EL ROL DEL USUARIO ES 'ADMIN'
  isAdmin(): boolean {
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');

    if (!token || !userStr) {
      return false;
    }

    try {
      const user = JSON.parse(userStr);
      // COMPRUEBA EL CAMPO 'ROL' QUE VIENE DEL BACKEND
      return user.rol === 'ADMIN';

    } catch (e) {
      console.error('Error al leer usuario', e);
      return false;
    }
  }

  // --- ENDPOINTS DE RECUPERACION DE CONTRASEÑA ---

  // ENVIA CODIGO DE RECUPERACION AL CORREO
  recoverPassword(email: string) {
    return this.http.post(`${API_URL}/recover-password`, { email });
  }

  // VALIDA EL CODIGO QUE INGRESO EL USUARIO
  verifyRecoveryCode(email: string, code: string) {
    return this.http.post(`${API_URL}/verify-code`, { email, code });
  }

  // CAMBIA LA CONTRASEÑA FINALMENTE CON EL CODIGO VERIFICADO
  resetPassword(email: string, code: string, newPassword: string) {
    return this.http.post(`${API_URL}/reset-password`, { email, code, newPassword });
  }
}