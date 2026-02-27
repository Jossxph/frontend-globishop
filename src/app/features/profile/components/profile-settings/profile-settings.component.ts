import { Component, EventEmitter, Input, OnInit, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from '../../../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in-up">
        
        <div class="bg-card border border-theme rounded-2xl p-6 h-fit shadow-sm">
          <h3 class="font-bold text-main mb-6 flex items-center gap-2 pb-4 border-b border-theme">
            <i class="ri-user-settings-line text-primary text-xl"></i> Datos Personales
          </h3>
          <form [formGroup]="updateForm" (ngSubmit)="onUpdateProfile()">
            <div class="space-y-5 mb-6">
              <div>
                <label class="text-xs font-bold text-muted uppercase tracking-wider mb-1 block">Nombre Completo</label>
                <div class="relative">
                  <i class="ri-user-line absolute left-3 top-3 text-muted"></i>
                  <input type="text" formControlName="nombreCompleto" class="w-full bg-input border border-theme rounded-xl pl-10 pr-4 py-2.5 text-main focus:border-primary outline-none transition-all">
                </div>
              </div>
              
              <div>
                <label class="text-xs font-bold text-muted uppercase tracking-wider mb-1 block">Teléfono</label>
                <div class="relative">
                  <i class="ri-phone-line absolute left-3 top-3 text-muted"></i>
                  <input type="text" formControlName="telefono" class="w-full bg-input border border-theme rounded-xl pl-10 pr-4 py-2.5 text-main focus:border-primary outline-none transition-all">
                </div>
              </div>
              
              <div>
                <label class="text-xs font-bold text-muted uppercase tracking-wider mb-1 block">URL de Foto (Avatar)</label>
                <div class="relative">
                  <i class="ri-image-line absolute left-3 top-3 text-muted"></i>
                  <input type="text" formControlName="fotoUrl" placeholder="https://..." class="w-full bg-input border border-theme rounded-xl pl-10 pr-4 py-2.5 text-main focus:border-primary outline-none transition-all">
                </div>
              </div>
            </div>
            
            <button type="submit" [disabled]="isUpdating" class="w-full bg-primary hover:bg-secondary text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20 hover:-translate-y-1 cursor-pointer flex items-center justify-center gap-2">
              <span *ngIf="!isUpdating">Guardar Cambios</span>
              <span *ngIf="isUpdating"><i class="ri-loader-4-line animate-spin"></i> Guardando...</span>
            </button>
          </form>
        </div>

        <div class="space-y-6">
          
          <div class="bg-card border border-theme rounded-2xl p-6 shadow-sm">
              <h3 class="font-bold text-main mb-4 flex items-center gap-2">
                <i class="ri-shield-key-line text-primary text-xl"></i> Contraseña
              </h3>
              <form [formGroup]="passForm" (ngSubmit)="onChangePassword()" class="space-y-4">
                <input type="password" formControlName="actualPassword" placeholder="Contraseña Actual" class="w-full bg-input border border-theme rounded-xl px-4 py-2.5 text-main focus:border-primary outline-none">
                <input type="password" formControlName="nuevaPassword" placeholder="Nueva Contraseña (min. 6 caracteres)" class="w-full bg-input border border-theme rounded-xl px-4 py-2.5 text-main focus:border-primary outline-none">
                <button type="submit" [disabled]="passForm.invalid" class="w-full bg-input hover:bg-hover border border-theme text-main font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-sm">
                  Actualizar Contraseña
                </button>
              </form>
          </div>

          <div class="bg-card border border-theme rounded-2xl p-6 shadow-sm">
              <h3 class="font-bold text-main mb-2 flex items-center gap-2">
                <i class="ri-mail-send-line text-primary text-xl"></i> Correo Electrónico
              </h3>
              <p class="text-xs text-muted mb-4">Te enviaremos un código de seguridad para confirmar.</p>
              
              <div *ngIf="!emailStep2">
                <button (click)="onRequestEmailChange()" [disabled]="isLoadingEmail" class="w-full bg-input hover:bg-hover border border-theme text-main font-bold py-2.5 rounded-xl transition-colors cursor-pointer text-sm flex items-center justify-center gap-2">
                  <span *ngIf="!isLoadingEmail">Solicitar Cambio de Correo</span>
                  <span *ngIf="isLoadingEmail" class="text-primary"><i class="ri-loader-4-line animate-spin"></i> Enviando código...</span>
                </button>
              </div>

              <div *ngIf="emailStep2" class="space-y-3 animate-fade-in-up bg-input/50 p-4 rounded-xl border border-theme">
                <p class="text-xs text-center text-primary font-bold">¡Código enviado! Revisa tu bandeja.</p>
                <input type="text" [(ngModel)]="emailCode" placeholder="Código (4 dígitos)" class="w-full bg-card border border-theme rounded-xl px-4 py-2.5 text-main text-center tracking-[5px] font-bold outline-none focus:border-primary">
                <input type="email" [(ngModel)]="newEmail" placeholder="Nuevo Correo Electrónico" class="w-full bg-card border border-theme rounded-xl px-4 py-2.5 text-main outline-none focus:border-primary">
                <button (click)="onConfirmEmailChange()" class="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg shadow-green-500/20">
                  Confirmar Cambio
                </button>
              </div>
          </div>

          <div class="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-5 flex items-center justify-between">
              <div class="text-xs text-red-600 dark:text-red-400">
                <p class="font-bold mb-0.5">Eliminar Cuenta</p>
                <p class="opacity-80">Acción irreversible.</p>
              </div>
              <button (click)="onDeleteAccount()" class="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-bold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors cursor-pointer">
                Eliminar
              </button>
          </div>

        </div>
    </div>
  `
})
export class ProfileSettingsComponent implements OnInit, OnChanges {
  @Input() user: any;
  @Output() profileUpdated = new EventEmitter<void>();

  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);

  updateForm = this.fb.group({
    nombreCompleto: ['', [Validators.required]],
    telefono: [''],
    fotoUrl: ['']
  });

  passForm = this.fb.group({
    actualPassword: ['', Validators.required],
    nuevaPassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  isUpdating = false;
  isLoadingEmail = false;
  emailStep2 = false;
  emailCode = '';
  newEmail = '';

  ngOnInit() {
    this.fillForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['user'] && this.user) {
      this.fillForm();
    }
  }

  fillForm() {
    if (this.user) {
      this.updateForm.patchValue({
        nombreCompleto: this.user.nombreCompleto || this.user.nombre,
        telefono: this.user.telefono,
        fotoUrl: this.user.fotoUrl
      });
    }
  }

  onUpdateProfile() {
    if (this.updateForm.invalid) return;
    this.isUpdating = true;
    this.profileService.updateProfile(this.updateForm.value).subscribe({
      next: () => {
        this.isUpdating = false;
        Swal.fire({ icon: 'success', title: 'Datos actualizados', toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 });
        this.profileUpdated.emit();
      },
      error: () => this.isUpdating = false
    });
  }

  onChangePassword() {
    if (this.passForm.invalid) return;
    this.profileService.changePassword(this.passForm.value).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Contraseña actualizada', 'success');
        this.passForm.reset();
      },
      error: (err: any) => Swal.fire('Error', err.error?.message || 'Error al cambiar contraseña', 'error')
    });
  }

  onRequestEmailChange() {
    this.isLoadingEmail = true;
    this.profileService.requestEmailChange().subscribe({
      next: () => {
        this.isLoadingEmail = false;
        this.emailStep2 = true;
        Swal.fire('Código Enviado', 'Revisa tu correo actual', 'info');
      },
      error: () => {
        this.isLoadingEmail = false;
        Swal.fire('Error', 'No se pudo enviar el código', 'error');
      }
    });
  }

  onConfirmEmailChange() {
    if (!this.emailCode || !this.newEmail) return;
    this.profileService.confirmEmailChange({ codigo: this.emailCode, nuevoEmail: this.newEmail }).subscribe({
      next: () => {
        Swal.fire('Éxito', 'Correo actualizado. Inicia sesión de nuevo.', 'success').then(() => {
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        });
      },
      error: (err: any) => Swal.fire('Error', err.error?.message || 'Código incorrecto', 'error')
    });
  }

  onDeleteAccount() {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esto no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar cuenta'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteAccount().subscribe({
          next: () => {
            this.authService.logout();
            Swal.fire('Eliminada', 'Tu cuenta ha sido cerrada.', 'success');
            this.router.navigate(['/']);
          },
          error: (err: any) => Swal.fire('Error', err.error?.message, 'error')
        });
      }
    });
  }
}