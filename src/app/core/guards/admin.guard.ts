import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  // INYECCION DE DEPENDENCIAS (SERVICIO DE AUTH Y ROUTER)
  const authService = inject(AuthService);
  const router = inject(Router);

  // VERIFICA SI EL USUARIO TIENE SESION ACTIVA
  if (!authService.isAuthenticated()) {
    // SI NO ESTA LOGUEADO, LO MANDA AL LOGIN
    router.navigate(['/auth/login']);
    return false;
  }

  // SI ESTA LOGUEADO, VALIDA SI TIENE ROL DE ADMINISTRADOR
  if (authService.isAdmin()) {
    // ACCESO PERMITIDO
    return true;
  } else {
    // SI NO ES ADMIN, MUESTRA ALERTA DE ERROR VISUAL
    Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: 'No tienes permisos de administrador para ver esta zona.',
      confirmButtonColor: '#d33'
    });

    // REDIRIGE AL HOME PARA SACARLO DE LA RUTA PROTEGIDA
    router.navigate(['/home']);
    return false;
  }
};