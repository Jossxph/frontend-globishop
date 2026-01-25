import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
    // INYECCION DE DEPENDENCIAS (AUNQUE NO SE USA AUTHSERVICE AQUI, ESTA DISPONIBLE)
    const authService = inject(AuthService);

    // RECUPERA EL TOKEN JWT ALMACENADO EN EL NAVEGADOR
    const token = localStorage.getItem('token');

    if (token) {
        // SI EXISTE TOKEN, CLONA LA PETICION (LAS REQUEST SON INMUTABLES)
        // Y AGREGA EL HEADER DE AUTORIZACION TIPO BEARER
        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
        // ENVIA LA PETICION MODIFICADA AL BACKEND
        return next(authReq);
    }

    // SI NO HAY TOKEN, ENVIA LA PETICION ORIGINAL TAL CUAL
    return next(req);
};