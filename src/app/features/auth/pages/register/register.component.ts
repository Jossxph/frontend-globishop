import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, CommonModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  // INYECCION DE DEPENDENCIAS: CONSTRUCTOR DE FORMULARIOS, AUTH Y ROUTER :V
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  // CONFIGURACION DEL FORMULARIO REACTIVO CON VALIDACIONES
  registerForm: FormGroup = this.fb.group({
    nombreCompleto: ['', [Validators.required, Validators.minLength(6)]], // MINIMO 6 LETRAS
    email: ['', [Validators.required, Validators.email]], // FORMATO DE EMAIL VALIDO
    password: ['', [Validators.required, Validators.minLength(6)]] // PASSWORD SEGURA
  });

  // CONTROL DEL ESTADO DE CARGA (SPINNER EN EL BOTON)
  isLoading = false;

  // FUNCION PRINCIPAL AL ENVIAR EL FORMULARIO
  onSubmit() {
    // SI EL FORMULARIO NO ES VALIDO, NO HACEMOS NADA XD
    if (this.registerForm.invalid) return;

    // ACTIVAMOS EL SPINNER DE CARGA
    this.isLoading = true;

    // LLAMAMOS AL SERVICIO DE REGISTRO
    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;

        // EXITO: MOSTRAMOS ALERTA DE CUENTA CREADA :D
        Swal.fire({
          icon: 'success',
          title: '¡Cuenta Creada!',
          text: 'Te hemos enviado un código de verificación a tu correo.',
          confirmButtonText: 'Verificar ahora ->',
          confirmButtonColor: '#0ea5e9',
          backdrop: `rgba(0,0,0,0.4)`
        }).then(() => {
          // REDIRIGIMOS A LA PANTALLA DE VERIFICACION DE CODIGO
          this.router.navigate(['/auth/verify']);
        });
      },
      error: (err: any) => {
        // ERROR: MOSTRAMOS MENSAJE SI EL CORREO YA EXISTE O FALLA EL SERVER :(
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