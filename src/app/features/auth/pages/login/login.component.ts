import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  isLoading = false;

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        Swal.mixin({
          toast: true, position: 'top-end',
          showConfirmButton: false, timer: 3000, timerProgressBar: true
        }).fire({
          icon: 'success',
          title: `¡Hola, ${response.nombreCompleto || response.nombre || 'Usuario'}!`
        });

        // ✅ Siempre redirige al home — admin entra al panel desde el navbar
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Credenciales Incorrectas',
          text: err.error?.message || 'Por favor verifica tu correo y contraseña.',
          confirmButtonColor: '#0284c7',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
}