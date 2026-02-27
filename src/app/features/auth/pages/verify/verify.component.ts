import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

import { API_ROUTES } from '../../../../core/api/api-routes';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './verify.html'
})
export class VerifyComponent {
  // INYECCION DE DEPENDENCIAS
  // NOTA: AQUI SE USA HTTP DIRECTO, PERO PODRIA ESTAR EN EL AUTHSERVICE TAMBIEN :V
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  // CONFIGURACION DEL FORMULARIO
  // EL CODIGO DEBE SER EXACTAMENTE DE 6 DIGITOS
  verifyForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    code: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  isLoading = false;

  onSubmit() {
    // SI EL FORMULARIO ESTA INCOMPLETO, SE DETIENE AQUI
    if (this.verifyForm.invalid) return;
    this.isLoading = true;

    // ENVIA EL EMAIL Y EL CODIGO AL ENDPOINT DE VERIFICACION DEL BACKEND
    this.http.post(API_ROUTES.auth.verify, this.verifyForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;

        // EXITO: MUESTRA ALERTA Y REDIRIGE AL LOGIN PARA QUE ENTRE
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta Activada!',
          text: 'Ahora puedes iniciar sesión.',
          confirmButtonColor: '#0ea5e9'
        }).then(() => {
          this.router.navigate(['/auth/login']);
        });
      },
      error: (err) => {
        // ERROR: CODIGO INCORRECTO O EXPIRADO
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'Código incorrecto',
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }
}