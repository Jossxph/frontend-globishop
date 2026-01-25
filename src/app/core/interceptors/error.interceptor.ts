import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import Swal from 'sweetalert2';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);

    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {

            if (error.status === 401 || error.status === 403) {

                const token = localStorage.getItem('token');

                if (token) {
                    if (!document.querySelector('.swal2-container')) {
                        Swal.fire({
                            icon: 'warning',
                            title: 'Sesión Expirada',
                            text: 'Tu sesión ha terminado por seguridad. Por favor, ingresa nuevamente.',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'Ir al Login',
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        }).then((result) => {
                            if (result.isConfirmed) {
                                localStorage.removeItem('token');
                                localStorage.removeItem('user');
                                router.navigate(['/auth/login']);
                            }
                        });
                    }
                } else {
                    // NO HAY "Sesión Expirada" PORQUE NUNCA TUYO SESIÓN
                }
            }

            return throwError(() => error);
        })
    );
};