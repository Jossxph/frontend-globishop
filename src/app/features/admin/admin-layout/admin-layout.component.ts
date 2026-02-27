import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet, Router, RouterLinkActive, NavigationEnd } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="flex h-screen bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 font-sans overflow-hidden">
      
      <header class="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex items-center justify-between px-4 z-40 shadow-sm transition-colors duration-300">
          
          <div class="flex items-center gap-2">
             <div class="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white">
                <i class="ri-shield-star-line text-lg"></i>
             </div>
             <span class="font-black text-lg tracking-tight text-[var(--text-main)]">ADMIN</span>
          </div>

          <button (click)="toggleSidebar()" class="w-10 h-10 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] flex items-center justify-center active:scale-95 transition-transform">
             <i class="ri-menu-4-line text-xl"></i>
          </button>
      </header>


      <aside [class.translate-x-0]="isSidebarOpen" 
             [class.-translate-x-full]="!isSidebarOpen"
             class="fixed inset-y-0 left-0 w-72 bg-[var(--bg-card)] border-r border-[var(--border-color)] z-50 transition-transform duration-300 shadow-2xl lg:shadow-none lg:static lg:translate-x-0 flex flex-col">
        
        <div class="h-16 lg:h-20 flex items-center justify-between px-6 border-b border-[var(--border-color)] shrink-0">
           
           <h1 class="text-2xl font-black tracking-tight flex items-center gap-3">
              <div class="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center text-white shadow-lg shadow-[var(--color-primary)]/30">
                  <i class="ri-shield-star-line text-lg"></i>
              </div>
              <span class="bg-clip-text text-transparent bg-gradient-to-r from-[var(--text-main)] to-[var(--text-muted)]">
                  ADMIN
              </span>
           </h1>

           <button (click)="toggleSidebar()" class="lg:hidden w-8 h-8 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)] flex items-center justify-center">
              <i class="ri-close-large-line"></i>
           </button>
        </div>

        <nav class="flex-1 overflow-y-auto py-6 px-4 space-y-1 custom-scrollbar">
           
           <p class="px-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 mt-2">General</p>
           
           <a routerLink="/admin/dashboard" 
              routerLinkActive="!bg-[var(--color-primary)] !text-white shadow-md shadow-[var(--color-primary)]/20"
              (click)="closeSidebarOnMobile()"
              class="group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]">
              <i class="ri-dashboard-3-line text-lg transition-transform group-hover:scale-110"></i> 
              Dashboard
           </a>

           <p class="px-4 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest mb-2 mt-6">Gestión</p>
           
           <a routerLink="/admin/products" 
              routerLinkActive="!bg-[var(--color-primary)] !text-white shadow-md shadow-[var(--color-primary)]/20"
              (click)="closeSidebarOnMobile()"
              class="group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]">
             <i class="ri-box-3-line text-lg transition-transform group-hover:scale-110"></i> 
             Productos
           </a>

           <a routerLink="/admin/categories" 
              routerLinkActive="!bg-[var(--color-primary)] !text-white shadow-md shadow-[var(--color-primary)]/20"
              (click)="closeSidebarOnMobile()"
              class="group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]">
             <i class="ri-box-3-line text-lg transition-transform group-hover:scale-110"></i> 
             Categorias
           </a>
           
           <a routerLink="/admin/orders" 
              routerLinkActive="!bg-[var(--color-primary)] !text-white shadow-md shadow-[var(--color-primary)]/20"
              (click)="closeSidebarOnMobile()"
              class="group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]">
             <i class="ri-shopping-bag-3-line text-lg transition-transform group-hover:scale-110"></i> 
             Pedidos
           </a>
           
           <a routerLink="/admin/users" 
              routerLinkActive="!bg-[var(--color-primary)] !text-white shadow-md shadow-[var(--color-primary)]/20"
              (click)="closeSidebarOnMobile()"
              class="group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)]">
             <i class="ri-group-line text-lg transition-transform group-hover:scale-110"></i> 
             Usuarios
           </a>

        </nav>

        <div class="p-4 border-t border-[var(--border-color)] shrink-0">
            <button (click)="logout()" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[var(--bg-input)] hover:bg-[var(--color-error)] hover:text-white text-[var(--color-error)] rounded-xl transition-all font-bold text-sm group border border-[var(--border-color)] hover:border-[var(--color-error)]">
                <i class="ri-logout-box-line group-hover:-translate-x-1 transition-transform"></i> 
                Cerrar Sesión
            </button>
        </div>
      </aside>

      <div *ngIf="isSidebarOpen" 
           (click)="toggleSidebar()"
           class="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity animate-fade-in">
      </div>


      <div class="flex-1 flex flex-col h-full overflow-hidden relative pt-16 lg:pt-0">
         
         <header class="hidden lg:flex h-20 bg-[var(--bg-card)]/80 backdrop-blur-md border-b border-[var(--border-color)] items-center justify-between px-8 z-10 sticky top-0 transition-colors duration-300">
            
            <div>
              <h2 class="text-xl font-bold text-[var(--text-main)]">Panel de Control</h2>
              <p class="text-xs text-[var(--text-muted)]">Bienvenido de nuevo, {{ authService.getUser()?.nombre }}</p>
            </div>

            <div class="flex items-center gap-4">
               <button class="w-10 h-10 rounded-full border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-[var(--text-main)] flex items-center justify-center transition-colors relative">
                  <i class="ri-notification-3-line"></i>
                  <span class="absolute top-2 right-2 w-2 h-2 bg-[var(--color-error)] rounded-full border-2 border-[var(--bg-card)]"></span>
               </button>

               <div class="h-8 w-[1px] bg-[var(--border-color)] mx-2"></div>

               <div class="flex items-center gap-3">
                   <div class="text-right">
                      <p class="text-sm font-bold text-[var(--text-main)]">{{ authService.getUser()?.nombre || 'Admin' }}</p>
                      <span class="text-[10px] font-bold text-[var(--color-primary)] uppercase tracking-wider bg-[var(--color-primary)]/10 px-2 py-0.5 rounded-full block w-fit ml-auto">Activo</span>
                   </div>
                   <div class="w-10 h-10 rounded-full bg-[var(--bg-input)] border-2 border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] font-bold shadow-sm">
                      {{ getUserInitial() }}
                   </div>
               </div>
            </div>
         </header>

         <main class="flex-1 overflow-y-auto p-4 md:p-6 lg:p-10 scroll-smooth bg-[var(--bg-main)] custom-scrollbar">
             <div class="max-w-7xl mx-auto w-full animate-fade-in pb-20 lg:pb-0">
                 <router-outlet></router-outlet>
             </div>
         </main>

      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in { 
      animation: fadeIn 0.3s ease-out forwards; 
    }
    @keyframes fadeIn { 
      from { opacity: 0; } 
      to { opacity: 1; } 
    }
    
    .custom-scrollbar::-webkit-scrollbar { 
      width: 5px; 
      height: 5px; 
    }
    .custom-scrollbar::-webkit-scrollbar-track { 
      background: transparent; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb { 
      background: var(--border-color); 
      border-radius: 4px; 
    }
    .custom-scrollbar::-webkit-scrollbar-thumb:hover { 
      background: var(--text-muted); 
    }
  `]
})
export class AdminLayoutComponent {
  // INYECCION DE DEPENDENCIAS
  public authService = inject(AuthService);
  private router = inject(Router);

  // VARIABLE PARA CONTROLAR SI EL MENU LATERAL ESTA VISIBLE EN MOVIL
  isSidebarOpen = false;

  constructor() {
    // ESCUCHA CADA VEZ QUE CAMBIA LA RUTA (NAVEGACION)
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // CIERRA AUTOMATICAMENTE EL SIDEBAR AL CAMBIAR DE PAGINA :D
      this.isSidebarOpen = false;
    });
  }

  // INTERCAMBIA EL ESTADO DEL SIDEBAR (ABRIR/CERRAR)
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // LOGICA PARA CERRAR EL MENU SOLO SI ESTAMOS EN PANTALLA DE MOVIL (<1024PX)
  closeSidebarOnMobile() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen = false;
    }
  }

  // CIERRA LA SESION Y MANDA AL USUARIO AL LOGIN DE VUELTA
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  // EXTRAE LA PRIMERA LETRA DEL NOMBRE PARA MOSTRAR EN EL AVATAR
  getUserInitial(): string {
    const nombre = this.authService.getUser()?.nombre;
    // SI HAY NOMBRE DEVUELVE LA INICIAL, SI NO, PONE UNA 'A' POR DEFECTO
    return nombre ? nombre.charAt(0).toUpperCase() : 'A';
  }
}