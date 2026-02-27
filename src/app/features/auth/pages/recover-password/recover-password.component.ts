import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recover-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './recover-password.html',
  styles: [`
    .animate-slide-up { 
      animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; 
    }
    .animate-fade-in { 
      animation: fadeIn 0.5s ease-out forwards; 
    }
    @keyframes slideUp { 
      from { opacity: 0; transform: translateY(20px); } 
      to { opacity: 1; transform: translateY(0); } 
    }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  `]
})
export class RecoverPasswordComponent {
  // INYECCION DE DEPENDENCIAS
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // CONTROL DEL WIZARD (PASO 1, 2 O 3)
  step = 1;
  isLoading = false;
  showPass = false;
  userEmail = ''; // GUARDAMOS EL EMAIL PARA USARLO EN LOS SIGUIENTES PASOS

  // --- DEFINICION DE FORMULARIOS INDEPENDIENTES ---

  // FORMULARIO PASO 1: SOLO EMAIL
  emailForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });

  // FORMULARIO PASO 2: CODIGO DE VERIFICACION
  codeForm: FormGroup = this.fb.group({
    code: ['', [Validators.required, Validators.minLength(4)]]
  });

  // FORMULARIO PASO 3: NUEVA CONTRASEÑA (CON VALIDACION DE COINCIDENCIA)
  passwordForm: FormGroup = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, { validators: this.passwordMatchValidator });

  // VALIDADOR PERSONALIZADO: REVISA QUE PASS Y CONFIRM_PASS SEAN IGUALES
  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { mismatch: true };
  }

  // --- LOGICA DEL PASO 1 (ENVIAR CORREO) ---
  handleEmailSubmit() {
    if (this.emailForm.invalid) return;

    this.isLoading = true;
    this.userEmail = this.emailForm.value.email;

    // LLAMA AL BACKEND PARA QUE ENVIE EL CODIGO AL CORREO
    this.authService.recoverPassword(this.userEmail).subscribe({
      next: () => {
        this.isLoading = false;
        this.step = 2; // AVANZA AL SIGUIENTE PASO VISUAL

        // NOTIFICACION DE EXITO
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          background: 'var(--bg-card)',
          color: 'var(--text-main)'
        });
        Toast.fire({
          icon: 'success',
          title: 'Código enviado al correo'
        });
      },
      error: (err: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No se pudo enviar el correo',
          background: 'var(--bg-card)',
          color: 'var(--text-main)'
        });
      }
    });
  }

  // --- LOGICA DEL PASO 2 (VERIFICAR CODIGO) ---
  handleCodeSubmit() {
    if (this.codeForm.invalid) return;

    this.isLoading = true;
    const code = this.codeForm.value.code;

    // ENVIA EL CODIGO AL BACKEND PARA VERIFICAR SI ES CORRECTO
    this.authService.verifyRecoveryCode(this.userEmail, code).subscribe({
      next: () => {
        this.isLoading = false;
        this.step = 3; // SI ES CORRECTO, AVANZA AL ULTIMO PASO
      },
      error: (err: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Código Incorrecto',
          text: 'Por favor verifica el código enviado.',
          background: 'var(--bg-card)',
          color: 'var(--text-main)'
        });
      }
    });
  }

  // --- LOGICA DEL PASO 3 (CAMBIAR CONTRASEÑA) ---
  handlePasswordSubmit() {
    if (this.passwordForm.invalid) return;

    this.isLoading = true;
    const code = this.codeForm.value.code; // NECESITAMOS EL CODIGO DE NUEVO PARA VALIDAR FINALMENTE
    const newPass = this.passwordForm.value.password;

    // EJECUTA EL CAMBIO DE CONTRASEÑA REAL EN BASE DE DATOS
    this.authService.resetPassword(this.userEmail, code, newPass).subscribe({
      next: () => {
        this.isLoading = false;

        // EXITO TOTAL: MUESTRA ALERTA Y REDIRIGE AL LOGIN
        Swal.fire({
          icon: 'success',
          title: '¡Contraseña Actualizada!',
          text: 'Ya puedes iniciar sesión con tu nueva clave.',
          confirmButtonText: 'Ir al Login',
          confirmButtonColor: 'var(--color-primary)',
          background: 'var(--bg-card)', color: 'var(--text-main)'
        }).then(() => {
          this.router.navigate(['/auth/login']);
        });
      },
      error: (err: any) => {
        this.isLoading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: err.error?.message || 'No se pudo cambiar la contraseña',
          background: 'var(--bg-card)',
          color: 'var(--text-main)'
        });
      }
    });
  }
}