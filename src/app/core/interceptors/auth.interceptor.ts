import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // INYECCION DE DEPENDENCIAS
    const authService = inject(AuthService);

    // RECUPERA EL TOKEN JWT ALMACENADO EN EL NAVEGADOR
    const token = localStorage.getItem('token');

    if (token) {
        // SI EXISTE TOKEN, CLONA LA PETICION Y AGREGA EL HEADER DE AUTORIZACION
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        // ENVIA LA PETICION MODIFICADA AL BACKEND
        return next(authReq);
    }

    // SI NO HAY TOKEN, ENVIA LA PETICION ORIGINAL TAL CUAL
    return next(req);
};