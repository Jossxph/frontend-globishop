import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService } from '../../../core/services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="space-y-8 animate-fade-in-up">
      
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
           <h2 class="text-3xl font-black text-[var(--text-main)] tracking-tight">Resumen Global</h2>
           <p class="text-[var(--text-muted)] mt-1">Lo que está pasando en tu tienda hoy.</p>
        </div>
        
        <div class="flex bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1 shadow-sm">
            <button class="px-4 py-1.5 text-xs font-bold rounded-lg bg-[var(--bg-input)] text-[var(--text-main)] shadow-sm">Hoy</button>
            <button class="px-4 py-1.5 text-xs font-bold rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]">7 Días</button>
            <button class="px-4 py-1.5 text-xs font-bold rounded-lg text-[var(--text-muted)] hover:text-[var(--text-main)]">Mes</button>
        </div>
      </div>

      <div *ngIf="isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
         <div *ngFor="let i of [1,2,3,4]" class="bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] h-32">
             <div class="w-12 h-12 rounded-full bg-[var(--bg-input)] mb-4"></div>
             <div class="h-4 w-24 bg-[var(--bg-input)] rounded mb-2"></div>
             <div class="h-8 w-32 bg-[var(--bg-input)] rounded"></div>
         </div>
      </div>

      <div *ngIf="!isLoading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="group bg-[var(--bg-card)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] flex items-center gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-green-500/10 text-green-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <i class="ri-money-dollar-circle-line"></i>
          </div>
          <div>
            <p class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Ingresos Totales</p>
            <p class="text-2xl font-black text-[var(--text-main)]">
              S/ {{ stats?.ingresosTotales || 0 | number:'1.2-2' }}
            </p>
          </div>
        </div>

        <div class="group bg-[var(--bg-card)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] flex items-center gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <i class="ri-shopping-bag-3-line"></i>
          </div>
          <div>
            <p class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Total Pedidos</p>
            <p class="text-2xl font-black text-[var(--text-main)]">
              {{ stats?.totalPedidos || 0 }}
            </p>
          </div>
        </div>

        <div class="group bg-[var(--bg-card)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] flex items-center gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <i class="ri-group-line"></i>
          </div>
          <div>
            <p class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">Usuarios Activos</p>
            <p class="text-2xl font-black text-[var(--text-main)]">
              {{ stats?.totalUsuarios || 0 }}
            </p>
          </div>
        </div>

        <div class="group bg-[var(--bg-card)] p-6 rounded-2xl shadow-sm border border-[var(--border-color)] flex items-center gap-5 hover:shadow-md hover:-translate-y-1 transition-all duration-300">
          <div class="w-14 h-14 rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
            <i class="ri-box-3-line"></i>
          </div>
          <div>
            <p class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">En Inventario</p>
            <p class="text-2xl font-black text-[var(--text-main)]">
              {{ stats?.totalProductos || 0 }}
            </p>
          </div>
        </div>

      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-1 bg-gradient-to-br from-slate-800 to-slate-950 dark:from-[var(--color-primary)] dark:to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl flex flex-col justify-between group">
           <div class="relative z-10">
             <div class="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                 <i class="ri-add-line text-2xl"></i>
             </div>
             <h3 class="text-2xl font-bold mb-2 leading-tight">Administrar<br>Catálogo</h3>
             <p class="text-slate-300 text-sm mb-8 leading-relaxed">Agrega nuevo stock, edita precios o sube imágenes nuevas para mantener tu tienda actualizada.</p>
             
             <a routerLink="/admin/products" class="inline-flex items-center gap-2 bg-white text-slate-900 font-bold py-3 px-6 rounded-xl hover:bg-slate-100 transition-all hover:gap-3 cursor-pointer shadow-lg">
               Ir a Productos <i class="ri-arrow-right-line"></i>
             </a>
           </div>
           
           <div class="absolute -right-10 -bottom-10 w-48 h-48 bg-[var(--color-primary)] rounded-full blur-[80px] opacity-40 group-hover:opacity-60 transition-opacity"></div>
           <i class="ri-store-2-line absolute top-10 -right-6 text-[150px] text-white opacity-5 rotate-12 pointer-events-none"></i>
        </div>

        <div class="lg:col-span-2 bg-[var(--bg-card)] rounded-3xl p-8 border border-[var(--border-color)] shadow-sm">
           <div class="flex justify-between items-center mb-6">
               <h3 class="font-bold text-[var(--text-main)] text-lg">Actividad Reciente</h3>
               <button class="text-xs font-bold text-[var(--color-primary)] hover:underline">Ver todo</button>
           </div>
           
           <div class="space-y-6 relative pl-2">
              <div class="absolute left-[15px] top-2 bottom-2 w-[2px] bg-[var(--border-color)] z-0"></div>

              <div class="relative z-10 flex gap-4 items-start">
                 <div class="w-7 h-7 rounded-full bg-green-100 border-4 border-[var(--bg-card)] flex items-center justify-center shrink-0 mt-0.5">
                     <div class="w-2 h-2 rounded-full bg-green-500"></div>
                 </div>
                 <div>
                     <p class="text-sm font-medium text-[var(--text-main)]">Nuevo pedido <span class="font-bold">#1024</span> registrado.</p>
                     <p class="text-xs text-[var(--text-muted)] mt-0.5">Hace 2 minutos</p>
                 </div>
              </div>

              <div class="relative z-10 flex gap-4 items-start">
                 <div class="w-7 h-7 rounded-full bg-blue-100 border-4 border-[var(--bg-card)] flex items-center justify-center shrink-0 mt-0.5">
                     <div class="w-2 h-2 rounded-full bg-blue-500"></div>
                 </div>
                 <div>
                     <p class="text-sm font-medium text-[var(--text-main)]">Usuario <span class="font-bold">Juan Perez</span> se ha registrado.</p>
                     <p class="text-xs text-[var(--text-muted)] mt-0.5">Hace 1 hora</p>
                 </div>
              </div>

              <div class="relative z-10 flex gap-4 items-start">
                 <div class="w-7 h-7 rounded-full bg-yellow-100 border-4 border-[var(--bg-card)] flex items-center justify-center shrink-0 mt-0.5">
                     <div class="w-2 h-2 rounded-full bg-yellow-500"></div>
                 </div>
                 <div>
                     <p class="text-sm font-medium text-[var(--text-main)]">Stock bajo en <span class="font-bold">Laptop Gamer</span>.</p>
                     <p class="text-xs text-[var(--text-muted)] mt-0.5">Hace 3 horas</p>
                 </div>
              </div>
              
              <div class="relative z-10 flex gap-4 items-start">
                 <div class="w-7 h-7 rounded-full bg-purple-100 border-4 border-[var(--bg-card)] flex items-center justify-center shrink-0 mt-0.5">
                     <div class="w-2 h-2 rounded-full bg-purple-500"></div>
                 </div>
                 <div>
                     <p class="text-sm font-medium text-[var(--text-main)]">Categoría <span class="font-bold">Periféricos</span> actualizada.</p>
                     <p class="text-xs text-[var(--text-muted)] mt-0.5">Ayer</p>
                 </div>
              </div>

           </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    @keyframes fade-in-up {
      from { 
        opacity: 0; 
        transform: translateY(20px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }
    .animate-fade-in-up { 
      animation: fade-in-up 0.5s ease-out forwards; 
    }
  `]
})
export class AdminDashboardComponent implements OnInit {
  // INYECCION DEL SERVICIO DE ADMINISTRADOR
  private adminService = inject(AdminService);

  // OBJETO PARA ALMACENAR LAS ESTADISTICAS DEL DASHBOARD
  stats: any = {};

  // BANDERA PARA MOSTRAR SKELETON O SPINNER MIENTRAS CARGA
  isLoading = true;

  ngOnInit() {
    // INICIA LA CARGA DE DATOS AL MONTAR EL COMPONENTE
    this.loadStats();
  }

  loadStats() {
    // ACTIVA ESTADO DE CARGA
    this.isLoading = true;

    // LLAMADA AL BACKEND PARA OBTENER RESUMEN (VENTAS, USUARIOS, ETC)
    this.adminService.getStats().subscribe({
      next: (data) => {
        // ASIGNA LOS DATOS RECIBIDOS A LA VARIABLE LOCAL
        this.stats = data;

        // PEQUEÑO RETARDO ARTIFICIAL PARA QUE LA ANIMACION NO SEA BRUSCA
        setTimeout(() => this.isLoading = false, 500);
      },
      error: (err) => {
        // SI FALLA, MUESTRA ERROR EN CONSOLA Y PONE VALORES EN CERO PARA EVITAR ERRORES EN LA VISTA
        console.error('Error cargando stats:', err);
        this.isLoading = false;
        this.stats = { ingresosTotales: 0, totalPedidos: 0, totalUsuarios: 0, totalProductos: 0 };
      }
    });
  }
}