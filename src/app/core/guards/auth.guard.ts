import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  // INYECCION DE DEPENDENCIAS: AUTH PARA VALIDAR Y ROUTER PARA REDIRIGIR
  const authService = inject(AuthService);
  const router = inject(Router);

  // VERIFICA SI EL USUARIO YA INICIO SESION
  if (authService.isAuthenticated()) {
    // SI ESTA LOGUEADO, PERMITE EL ACCESO A LA RUTA
    return true;
  } else {
    // SI NO ESTA LOGUEADO, MUESTRA ALERTA FLOTANTE (TOAST)
    Swal.fire({
      icon: 'warning',
      title: 'Acceso Restringido',
      text: 'Debes iniciar sesión para acceder a esta sección.',
      timer: 3000,
      timerProgressBar: true,
      toast: true, // HACE QUE SEA UNA NOTIFICACION PEQUEÑA EN LA ESQUINA
      position: 'top-end',
      showConfirmButton: false
    });

    // REDIRIGE AL FORMULARIO DE LOGIN
    router.navigate(['/auth/login']);
    // BLOQUEA LA NAVEGACION A LA RUTA INTENTADA
    return false;
  }
};