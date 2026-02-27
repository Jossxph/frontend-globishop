import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { API_ROUTES } from '../api/api-routes';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  // ALMACENA EL ESTADO DEL USUARIO ACTUAL PARA QUE TODA LA APP LO VEA
  private currentUserSubject = new BehaviorSubject<any>(
    JSON.parse(localStorage.getItem('user') || 'null')
  );

  // OBSERVABLE PUBLICO PARA QUE OTROS COMPONENTES SE SUSCRIBAN A CAMBIOS DE USUARIO
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  // REALIZA LOGIN Y GUARDA TOKEN/USUARIO SI ES EXITOSO
  login(credentials: any): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.login, credentials).pipe(
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
    return this.http.post<any>(API_ROUTES.auth.register, userData);
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
    // Nota: El API_ROUTES tiene recoverPassword, usaremos ese si es el mismo
    return this.http.post<any>(API_ROUTES.auth.recoverPassword, { email });
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
    const userStr = localStorage.getItem('user');

    if (!userStr) return false;

    try {
      const user = JSON.parse(userStr);
      return user.rol === 'ADMIN';
    } catch (e) {
      console.error('Error al leer usuario', e);
      return false;
    }
  }

  // --- ENDPOINTS DE RECUPERACION DE CONTRASEÑA ---

  // ENVIA CODIGO DE RECUPERACION AL CORREO
  recoverPassword(email: string): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.recoverPassword, { email });
  }

  // VALIDA EL CODIGO QUE INGRESO EL USUARIO
  verifyRecoveryCode(email: string, code: string): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.verifyCode, { email, code });
  }

  // CAMBIA LA CONTRASEÑA FINALMENTE CON EL CODIGO VERIFICADO
  resetPassword(email: string, code: string, newPassword: string): Observable<any> {
    return this.http.post<any>(API_ROUTES.auth.resetPassword, { email, code, newPassword });
  }
}
