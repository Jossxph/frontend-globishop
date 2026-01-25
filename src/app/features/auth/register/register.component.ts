import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-main transition-colors duration-300 relative overflow-hidden py-10">
      
      <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none opacity-40"></div>
      <div class="hidden md:block absolute top-20 right-20 w-32 h-32 bg-secondary/20 rounded-full blur-2xl animate-pulse"></div>

      <div class="bg-card/80 backdrop-blur-md border border-theme p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md relative z-10 animate-fade-in-up">
        
        <div class="text-center mb-8">
          <h1 class="text-3xl font-black text-main tracking-tight mb-2">Crea tu cuenta</h1>
          <p class="text-muted text-sm">Únete a GlobiShop y obtén beneficios Nivel Bronce 🥉</p>
        </div>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-5">
          
          <div>
            <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-1">Nombre Completo</label>
            <div class="relative group">
              <i class="ri-user-smile-line absolute left-4 top-3.5 text-muted group-focus-within:text-primary transition-colors"></i>
              <input 
                type="text" 
                formControlName="nombreCompleto"
                class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-input border border-theme text-main focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/50 font-medium"
                placeholder="Ej. Juan Pérez"
              >
            </div>
            <div *ngIf="registerForm.get('nombreCompleto')?.touched && registerForm.get('nombreCompleto')?.invalid" class="text-red-500 text-xs mt-1.5 ml-1 font-medium">
               Mínimo 6 caracteres requeridos.
            </div>
          </div>

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
          </div>

          <div>
            <label class="block text-xs font-bold text-muted uppercase tracking-wider mb-2 ml-1">Contraseña</label>
            <div class="relative group">
              <i class="ri-lock-2-line absolute left-4 top-3.5 text-muted group-focus-within:text-primary transition-colors"></i>
              <input 
                type="password" 
                formControlName="password"
                class="w-full pl-12 pr-4 py-3.5 rounded-xl bg-input border border-theme text-main focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all placeholder:text-muted/50 font-medium"
                placeholder="••••••••"
              >
            </div>
            <div *ngIf="registerForm.get('password')?.touched && registerForm.get('password')?.invalid" class="text-red-500 text-xs mt-1.5 ml-1 font-medium">
               La contraseña debe tener al menos 6 caracteres.
            </div>
          </div>

          <div class="pt-2">
            <button 
              type="submit" 
              [disabled]="registerForm.invalid || isLoading"
              class="w-full py-4 bg-gradient-to-r from-primary to-sky-500 hover:to-sky-600 text-white font-bold rounded-xl shadow-lg shadow-primary/25 transition-all transform hover:-translate-y-1 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2 text-sm uppercase tracking-wide">
              <span *ngIf="!isLoading">Crear Cuenta Gratis</span>
              <span *ngIf="isLoading"><i class="ri-loader-4-line animate-spin text-lg"></i> Registrando...</span>
            </button>
          </div>
          
        </form>

        <div class="mt-8 pt-6 border-t border-theme text-center">
          <p class="text-sm text-muted">
            ¿Ya eres miembro? 
            <a routerLink="/auth/login" class="text-primary font-bold hover:text-secondary transition-colors cursor-pointer ml-1">
              Inicia Sesión
            </a>
          </p>
        </div>

      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    nombreCompleto: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  isLoading = false;

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;

        Swal.fire({
          icon: 'success',
          title: '¡Cuenta Creada!',
          text: 'Te hemos enviado un código de verificación a tu correo.',
          confirmButtonText: 'Verificar ahora ->',
          confirmButtonColor: '#0ea5e9',
          backdrop: `rgba(0,0,0,0.4)`
        }).then(() => {
          this.router.navigate(['/auth/verify']);
        });
      },
      error: (err) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'No se pudo registrar',
          text: err.error?.message || 'El correo ya está en uso o hubo un problema técnico.',
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }
}