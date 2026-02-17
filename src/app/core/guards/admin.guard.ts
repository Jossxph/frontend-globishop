import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  // INYECCION DE DEPENDENCIAS (SERVICIO DE AUTH Y ROUTER)
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('🛡️ Admin Guard ejecutándose...');
  console.log('🔗 Ruta solicitada:', state.url);

  // VERIFICA SI EL USUARIO TIENE SESION ACTIVA
  if (!authService.isAuthenticated()) {
    console.warn('❌ Usuario no autenticado');
    // SI NO ESTA LOGUEADO, LO MANDA AL LOGIN
    router.navigate(['/auth/login']);
    return false;
  }

  console.log('✅ Usuario autenticado');

  // SI ESTA LOGUEADO, VALIDA SI TIENE ROL DE ADMINISTRADOR
  const esAdmin = authService.isAdmin();
  console.log('🔐 Resultado isAdmin():', esAdmin);

  if (esAdmin) {
    console.log('✅ Acceso concedido - Es administrador');
    // ACCESO PERMITIDO
    return true;
  } else {
    console.warn('❌ Acceso denegado - No es administrador');
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