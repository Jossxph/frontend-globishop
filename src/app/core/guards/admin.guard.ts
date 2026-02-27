import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';
import { APP_ROUTES } from '../constants/app-routes';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/' + APP_ROUTES.LOGIN]);
    return false;
  }

  if (authService.isAdmin()) {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Acceso Denegado',
      text: 'No tienes permisos de administrador para ver esta zona.',
      confirmButtonColor: '#d33'
    });

    router.navigate(['/' + APP_ROUTES.HOME]);
    return false;
  }
};
