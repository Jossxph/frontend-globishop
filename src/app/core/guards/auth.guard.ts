import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  } else {
    Swal.fire({
      icon: 'warning',
      title: 'Acceso Restringido',
      text: 'Debes iniciar sesión para acceder a esta sección.',
      timer: 3000,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
      showConfirmButton: false
    });

    router.navigate(['/auth/login']);
    return false;
  }
};