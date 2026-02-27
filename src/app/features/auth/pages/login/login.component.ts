import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  // INYECCION DE DEPENDENCIAS: FORMULARIO, AUTH Y ROUTER :D
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // DEFINICION DEL FORMULARIO REACTIVO CON VALIDADORES DE CORREO Y PASSWORD
  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]]
  });

  // CONTROL VISUAL DE CARGA (SPINNER)
  isLoading = false;

  onSubmit() {
    // SI EL FORMULARIO ESTA INVALIDO, NO HACEMOS NADA :V
    if (this.loginForm.invalid) return;

    // ACTIVAMOS EL SPINNER Y LLAMAMOS AL SERVICIO DE LOGIN
    this.isLoading = true;
    const credentials = this.loginForm.value;

    this.authService.login(credentials).subscribe({
      next: (response) => {
        this.isLoading = false;

        // EXITO: CONFIGURAMOS Y MOSTRAMOS UNA NOTIFICACION FLOTANTE (TOAST) XD
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
          }
        });

        Toast.fire({
          icon: 'success',
          title: `¡Hola, ${response.nombre || 'Usuario'}!`
        });

        // REDIRIGIMOS AL USUARIO AL HOME
        this.router.navigate(['/']);
      },
      error: (err: any) => {
        // ERROR: SI LAS CREDENCIALES ESTAN MAL, APAGAMOS CARGA Y AVISAMOS :(
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Credenciales Incorrectas',
          text: 'Por favor verifica tu correo y contraseña.',
          confirmButtonColor: '#0284c7',
          confirmButtonText: 'Intentar de nuevo'
        });
      }
    });
  }
}