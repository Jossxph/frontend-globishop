import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-main p-4">
      <div class="bg-card border border-theme p-8 rounded-3xl shadow-xl w-full max-w-md text-center">
        
        <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-primary text-3xl">
          <i class="ri-mail-check-line"></i>
        </div>

        <h1 class="text-2xl font-bold text-main mb-2">Verifica tu Cuenta</h1>
        <p class="text-muted text-sm mb-6">
          Hemos enviado un código de 6 dígitos a tu correo. Ingrésalo para activar tu acceso.
        </p>

        <form [formGroup]="verifyForm" (ngSubmit)="onSubmit()" class="space-y-4">
          
          <div class="text-left">
            <label class="text-xs font-bold text-muted uppercase">Correo Electrónico</label>
            <input type="email" formControlName="email" class="w-full bg-input border border-theme rounded-lg px-4 py-3 text-main focus:border-primary outline-none transition-colors" placeholder="tu@email.com">
          </div>

          <div class="text-left">
            <label class="text-xs font-bold text-muted uppercase">Código de Verificación</label>
            <input type="text" formControlName="codigo" class="w-full bg-input border border-theme rounded-lg px-4 py-3 text-main focus:border-primary outline-none transition-colors text-center text-xl tracking-widest font-bold" placeholder="000000" maxlength="6">
          </div>

          <button type="submit" [disabled]="verifyForm.invalid || isLoading" class="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/30 disabled:opacity-50 cursor-pointer">
            {{ isLoading ? 'Verificando...' : 'ACTIVAR CUENTA' }}
          </button>

        </form>

        <p class="mt-6 text-sm text-muted">
          ¿Ya la activaste? <a routerLink="/auth/login" class="text-primary font-bold hover:underline cursor-pointer">Inicia Sesión</a>
        </p>
      </div>
    </div>
  `
})
export class VerifyComponent {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);
  private router = inject(Router);

  verifyForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
  });

  isLoading = false;

  onSubmit() {
    if (this.verifyForm.invalid) return;
    this.isLoading = true;

    this.http.post('http://localhost:8080/api/auth/verify', this.verifyForm.value).subscribe({
      next: (res: any) => {
        this.isLoading = false;
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