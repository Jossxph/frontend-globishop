import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminService } from '../../../core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="space-y-6 animate-fade-in-up pb-24 md:pb-0">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 class="text-3xl font-black text-[var(--text-main)] tracking-tight">Usuarios</h2>
          <p class="text-[var(--text-muted)] text-sm mt-1">Administra accesos, roles y niveles de fidelidad.</p>
        </div>
        
        <div class="bg-[var(--bg-card)] px-5 py-2.5 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-3">
           <span class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Registrados</span>
           <span class="text-xl font-black text-[var(--color-primary)]">{{ users.length }}</span>
        </div>
      </div>

      <div class="hidden md:block bg-[var(--bg-card)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--bg-input)] border-b border-[var(--border-color)]">
              <tr>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider w-20">Avatar</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Usuario</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Rol</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Nivel</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Estado</th>
                <th class="p-5 text-center text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)] text-sm">
              <tr *ngFor="let user of users" class="hover:bg-[var(--bg-hover)] transition-colors group">
                
                <td class="p-5">
                  <div class="w-10 h-10 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 p-[2px] shadow-sm">
                     <div class="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center overflow-hidden font-bold text-[var(--text-main)] text-xs">
                        <img *ngIf="user.fotoUrl" [src]="user.fotoUrl" class="w-full h-full object-cover">
                        <span *ngIf="!user.fotoUrl">{{ (user.nombreCompleto || user.username || 'U').charAt(0).toUpperCase() }}</span>
                     </div>
                  </div>
                </td>

                <td class="p-5">
                  <p class="font-bold text-[var(--text-main)] truncate max-w-[180px]">{{ user.nombreCompleto || user.username }}</p>
                  <p class="text-xs text-[var(--text-muted)] truncate max-w-[180px]">{{ user.email }}</p>
                </td>

                <td class="p-5">
                  <span class="px-2.5 py-1 rounded-lg text-xs font-bold border" 
                    [ngClass]="(user.rol?.nombre === 'ROL_ADMIN' || user.rol?.nombre === 'ADMIN') 
                      ? 'bg-purple-100 text-purple-700 border-purple-200' 
                      : 'bg-slate-100 text-slate-600 border-slate-200'">
                    {{ (user.rol?.nombre === 'ROL_ADMIN' || user.rol?.nombre === 'ADMIN') ? 'ADMIN' : 'CLIENTE' }}
                  </span>
                </td>

                <td class="p-5">
                  <div class="flex items-center gap-2">
                      <div class="w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm"
                           [ngClass]="getNivelColor(user.nivel?.nombre)">
                          <i class="ri-trophy-fill"></i>
                      </div>
                      <div>
                          <p class="font-bold text-[var(--text-main)] text-xs">{{ user.nivel?.nombre || 'Bronce' }}</p>
                          <p class="text-[10px] text-[var(--text-muted)] font-mono">{{ user.puntosActuales || 0 }} pts</p>
                      </div>
                  </div>
                </td>

                <td class="p-5">
                  <span *ngIf="user.estaActivo" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-bold border border-green-200">
                    <span class="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Activo
                  </span>
                  <span *ngIf="!user.estaActivo" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                    <span class="w-1.5 h-1.5 rounded-full bg-red-500"></span> Bloqueado
                  </span>
                </td>

                <td class="p-5 text-center">
                  <button (click)="toggleStatus(user)" 
                    class="w-full sm:w-auto px-4 py-1.5 rounded-lg text-xs font-bold border transition-all shadow-sm active:scale-95"
                    [class]="user.estaActivo 
                      ? 'bg-[var(--bg-card)] border-[var(--color-error)] text-[var(--color-error)] hover:bg-red-50' 
                      : 'bg-green-500 border-green-500 text-white hover:bg-green-600'">
                    {{ user.estaActivo ? 'Bloquear' : 'Activar' }}
                  </button>
                </td>

              </tr>
            </tbody>
          </table>
        </div>
        
        <div *ngIf="users.length === 0" class="p-16 text-center text-[var(--text-muted)]">
           <i class="ri-user-unfollow-line text-4xl opacity-50 mb-2"></i>
           <p class="font-medium">No se encontraron usuarios.</p>
        </div>
      </div>

      <div class="md:hidden grid gap-4">
          <div *ngFor="let user of users" class="bg-[var(--bg-card)] p-5 rounded-2xl shadow-sm border border-[var(--border-color)] flex flex-col gap-4 relative overflow-hidden">
              
              <div class="absolute top-0 right-0">
                  <span class="text-[10px] font-bold px-3 py-1 rounded-bl-xl border-l border-b border-[var(--border-color)]"
                        [ngClass]="(user.rol?.nombre === 'ROL_ADMIN' || user.rol?.nombre === 'ADMIN') ? 'bg-purple-100 text-purple-700' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'">
                      {{ (user.rol?.nombre === 'ROL_ADMIN' || user.rol?.nombre === 'ADMIN') ? 'ADMIN' : 'CLIENTE' }}
                  </span>
              </div>

              <div class="flex items-center gap-4">
                  <div class="w-16 h-16 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-color)] p-1 shrink-0">
                      <div class="w-full h-full rounded-xl overflow-hidden bg-white flex items-center justify-center text-xl font-bold text-[var(--color-primary)]">
                          <img *ngIf="user.fotoUrl" [src]="user.fotoUrl" class="w-full h-full object-cover">
                          <span *ngIf="!user.fotoUrl">{{ (user.nombreCompleto || user.username || 'U').charAt(0).toUpperCase() }}</span>
                      </div>
                  </div>
                  
                  <div class="flex-1 min-w-0">
                      <h3 class="font-bold text-[var(--text-main)] truncate text-lg leading-tight">{{ user.nombreCompleto || user.username }}</h3>
                      <p class="text-xs text-[var(--text-muted)] truncate mb-2">{{ user.email }}</p>
                      
                      <div class="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[var(--bg-input)] border border-[var(--border-color)]">
                          <i class="ri-trophy-fill text-xs" [ngClass]="getNivelTextColor(user.nivel?.nombre)"></i>
                          <span class="text-xs font-bold text-[var(--text-main)]">{{ user.nivel?.nombre || 'Bronce' }}</span>
                      </div>
                  </div>
              </div>

              <div class="flex items-center justify-between pt-3 border-t border-[var(--border-color)] border-dashed mt-1">
                  <div class="flex items-center gap-2 text-xs font-medium">
                      <span class="w-2 h-2 rounded-full" [ngClass]="user.estaActivo ? 'bg-green-500' : 'bg-red-500'"></span>
                      <span [ngClass]="user.estaActivo ? 'text-green-600' : 'text-red-600'">{{ user.estaActivo ? 'Cuenta Activa' : 'Bloqueado' }}</span>
                  </div>
                  
                  <button (click)="toggleStatus(user)" class="px-4 py-2 rounded-lg text-xs font-bold border transition-colors"
                          [class]="user.estaActivo 
                            ? 'bg-white border-red-200 text-red-600' 
                            : 'bg-green-500 border-green-500 text-white'">
                      {{ user.estaActivo ? 'Bloquear Acceso' : 'Activar Cuenta' }}
                  </button>
              </div>
          </div>
      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class AdminUsersComponent implements OnInit {
  private adminService = inject(AdminService);
  users: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getUsers().subscribe(data => this.users = data);
  }

  getNivelColor(nivelName: string): string {
    const name = nivelName?.toLowerCase() || '';
    if (name.includes('oro')) return 'bg-yellow-100 text-yellow-600 border border-yellow-200';
    if (name.includes('plata')) return 'bg-slate-200 text-slate-600 border border-slate-300';
    if (name.includes('diamante')) return 'bg-cyan-100 text-cyan-600 border border-cyan-200';
    return 'bg-orange-100 text-orange-700 border border-orange-200';
  }

  getNivelTextColor(nivelName: string): string {
    const name = nivelName?.toLowerCase() || '';
    if (name.includes('oro')) return 'text-yellow-500';
    if (name.includes('plata')) return 'text-slate-400';
    if (name.includes('diamante')) return 'text-cyan-500';
    return 'text-orange-600';
  }

  toggleStatus(user: any) {
    if (user.estaActivo) {
      Swal.fire({
        title: '¿Bloquear usuario?',
        text: "Este usuario perderá acceso inmediato a la tienda.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#64748b',
        confirmButtonText: 'Sí, bloquear acceso',
        cancelButtonText: 'Cancelar',
        background: 'var(--bg-card)',
        color: 'var(--text-main)'
      }).then((result) => {
        if (result.isConfirmed) this.executeToggle(user);
      });
    } else {
      this.executeToggle(user);
    }
  }

  executeToggle(user: any) {
    const id = user.userId || user.id;
    this.adminService.toggleUserStatus(id).subscribe({
      next: (res) => {
        const Toast = Swal.mixin({ toast: true, position: 'bottom-end', showConfirmButton: false, timer: 2000, background: 'var(--bg-card)', color: 'var(--text-main)' });

        if (!user.estaActivo) {
          Toast.fire({ icon: 'success', title: 'Usuario activado exitosamente' });
        } else {
          Toast.fire({ icon: 'warning', title: 'Usuario bloqueado' });
        }

        user.estaActivo = !user.estaActivo;
      },
      error: (err) => Swal.fire('Error', err.error?.message || 'No se pudo cambiar el estado', 'error')
    });
  }
}