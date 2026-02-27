import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    // INYECTA EL ROUTER PARA PODER REDIRIGIR AL LOGIN
    const router = inject(Router);

    // PROCESA LA RESPUESTA Y CAPTURA SI OCURRE UN ERROR
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            // VERIFICA SI EL ERROR ES 401 (NO AUTORIZADO) O 403 (PROHIBIDO)
            if (error.status === 401 || error.status === 403) {

                // REVISA SI EL USUARIO TENÍA UN TOKEN GUARDADO
                const token = localStorage.getItem('token');

                if (token) {
                    // EVITA QUE SALGAN MULTIPLES ALERTAS SI YA HAY UNA ABIERTA
                    if (!document.querySelector('.swal2-container')) {

                        // MUESTRA ALERTA DE SESIÓN EXPIRADA
                        Swal.fire({
                            icon: 'warning',
                            title: 'Sesión Expirada',
                            text: 'Tu sesión ha terminado por seguridad. Por favor, ingresa nuevamente.',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ir al Login',
                            allowOutsideClick: false, // OBLIGA A DAR CLICK EN EL BOTON
                            allowEscapeKey: false
                        }).then((result) => {
                            // AL CONFIRMAR LA ALERTA:
                            if (result.isConfirmed) {
                                // 1. LIMPIA EL TOKEN VENCIDO Y DATOS DEL USUARIO
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                // 2. REDIRIGE AL LOGIN
                                router.navigate(['/auth/login']);
                            }
                        });
                    }
                } else {
                    // SI NO TENÍA TOKEN, NO HACE NADA (EL GUARD SE ENCARGARÁ)
                }
            }

            // PROPAGA EL ERROR PARA QUE EL COMPONENTE QUE LLAMÓ TAMBIÉN SE ENTERE
            return throwError(() => error);
        })
    );
};