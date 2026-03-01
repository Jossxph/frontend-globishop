import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { APP_ROUTES } from '../constants/app-routes';

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/' + APP_ROUTES.LOGIN]);
    return false;
  }

  if (!authService.isAdmin()) {
    Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: 'No tienes permisos de administrador.',
      confirmButtonColor: '#d33'
    });
    router.navigate(['/' + APP_ROUTES.HOME]);
    return false;
  }

  // ✅ Pedir contraseña antes de entrar al panel
  const result = await Swal.fire({
    title: '🔐 Acceso al Panel',
    text: 'Confirma tu contraseña para continuar',
    input: 'password',
    inputPlaceholder: 'Tu contraseña',
    inputAttributes: { autocomplete: 'current-password' },
    showCancelButton: true,
    confirmButtonText: 'Entrar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#0284c7',
    showLoaderOnConfirm: true,
    preConfirm: (password) => {
      if (!password) {
        Swal.showValidationMessage('Ingresa tu contraseña');
        return false;
      }
      const user = authService.getUser();
      return fetch('http://localhost:8082/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email || user.sub, password })
      }).then(res => {
        if (!res.ok) {
          Swal.showValidationMessage('Contraseña incorrecta');
          return false;
        }
        return true;
      }).catch(() => {
        Swal.showValidationMessage('Error de conexión');
        return false;
      });
    },
    allowOutsideClick: () => !Swal.isLoading()
  });

  if (result.isConfirmed && result.value === true) {
    return true;
  }

  router.navigate(['/' + APP_ROUTES.HOME]);
  return false;
};