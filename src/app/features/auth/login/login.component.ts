import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-main transition-colors duration-300 relative overflow-hidden">
      
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none opacity-50"></div>
      <div class="absolute bottom-0 right-0 w-[300px] h-[300px] bg-secondary/10 rounded-full blur-[80px] pointer-events-none opacity-30"></div>

      <div class="bg-card/80 backdrop-blur-md border border-theme p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        
        <div class="text-center mb-10">
          <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-4 shadow-sm border border-primary/20">
            <img src="favicon.ico" alt="favicon" class="w-12 h-12">
          </div>
          <h1 class="text-3xl font-black text-main tracking-tight">Bienvenido de nuevo</h1>
          <p class="text-muted mt-2 text-sm">Ingresa tus credenciales para continuar.</p>
        </div>

        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-6">
          
          <div>
            <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-1">Correo Electrónico</label>
            <div class="relative group">
              <i class="ri-mail-line absolute left-4 top-3.5 text-muted group-focus-within:text-primary transition-colors"></i>
              <input 
                type="email" 
                formControlName="email"
                class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-input border border-theme text-main focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/50 font-medium"
                placeholder="nombre@ejemplo.com"
              >
            </div>
            <div *ngIf="loginForm.get('email')?.touched && loginForm.get('email')?.invalid" class="text-red-500 text-xs mt-1.5 ml-1 font-medium flex items-center gap-1">
              <i class="ri-error-warning-fill"></i> Ingresa un correo válido.
            </div>
          </div>

          <div>
            <div class="flex justify-between items-center mb-2 ml-1">
              <label class="block text-xs font-bold text-muted uppercase tracking-wider">Contraseña</label>
              <a routerLink="/auth/recover-password" class="text-xs text-primary font-bold hover:text-secondary hover:underline cursor-pointer transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            <div class="relative group">
              <i class="ri-lock-password-line absolute left-4 top-3.5 text-muted group-focus-within:text-primary transition-colors"></i>
              <input 
                type="password" 
                formControlName="password"
                class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-input border border-theme text-main focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/50 font-medium"
                placeholder="••••••••"
              >
            </div>
          </div>

          <button 
            type="submit" 
            [disabled]="loginForm.invalid || isLoading"
            class="w-full py-4 bg-primary hover:bg-sky-600 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
            <span *ngIf="!isLoading">Iniciar Sesión</span>
            <span *ngIf="isLoading"><i class="ri-loader-4-line animate-spin text-lg"></i> Validando...</span>
          </button>

        </form>

        <div class="mt-8 pt-6 border-t border-theme text-center">
          <p class="text-sm text-muted">
            ¿Aún no tienes cuenta? 
            <a routerLink="/auth/register" class="text-primary font-bold hover:text-secondary transition-colors cursor-pointer ml-1">
              Regístrate gratis
            </a>
          </p>
        </div>

      </div>
    </div>
  `
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
      error: (err) => {
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