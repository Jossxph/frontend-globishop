import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in-up pb-20 md:pb-0">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 class="text-3xl font-black text-[var(--text-main)] tracking-tight">Pedidos</h2>
          <p class="text-[var(--text-muted)] text-sm mt-1">Gestiona los envíos y monitorea el estado.</p>
        </div>
        
        <div class="bg-[var(--bg-card)] px-5 py-2.5 rounded-xl shadow-sm border border-[var(--border-color)] flex items-center gap-3">
           <span class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider">Total</span>
           <span class="text-xl font-black text-[var(--color-primary)]">{{ orders.length }}</span>
        </div>
      </div>

      <div class="hidden md:block bg-[var(--bg-card)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--bg-input)] border-b border-[var(--border-color)]">
              <tr>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">ID</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Cliente</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Fecha</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Total</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider w-40">Estado</th>
                <th class="p-5 text-center text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Acción</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)] text-sm">
              <tr *ngFor="let order of paginatedOrders" class="hover:bg-[var(--bg-hover)] transition-colors group">
                
                <td class="p-5 font-mono text-[var(--color-primary)] font-bold">
                    <span class="bg-[var(--color-primary)]/10 px-2 py-1 rounded">#{{ order.pedidoId }}</span>
                </td>
                
                <td class="p-5">
                  <div class="flex items-center gap-3">
                    <div class="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-500 p-[2px] shadow-sm shrink-0">
                        <div class="w-full h-full bg-[var(--bg-card)] rounded-full flex items-center justify-center text-xs font-bold text-[var(--text-main)]">
                            {{ getClientInitial(order) }}
                        </div>
                    </div>
                    <div class="min-w-0">
                      <p class="font-bold text-[var(--text-main)] truncate max-w-[150px]" [title]="getClientName(order)">
                          {{ getClientName(order) }}
                      </p>
                      <p class="text-xs text-[var(--text-muted)] truncate max-w-[150px]">
                          {{ order.user?.email || 'Sin email' }}
                      </p>
                    </div>
                  </div>
                </td>
                
                <td class="p-5 text-[var(--text-muted)] font-medium">{{ order.fechaPedido | date:'shortDate' }}</td>
                <td class="p-5 font-black text-[var(--text-main)]">S/ {{ order.total | number:'1.2-2' }}</td>
                
                <td class="p-5">
                  <select [ngModel]="order.estado?.estadoId" (ngModelChange)="changeStatus(order, $event)"
                    class="w-full pl-2 pr-6 py-1.5 rounded-lg text-xs font-bold border-none outline-none cursor-pointer appearance-none shadow-sm ring-1 ring-inset transition-all hover:shadow-md"
                    [ngClass]="getStatusColor(order.estado?.nombre)">
                    <option *ngFor="let s of statuses" [value]="s.estadoId" class="bg-[var(--bg-card)] text-[var(--text-main)]">
                        {{ s.nombre }}
                    </option>
                  </select>
                </td>
                
                <td class="p-5 text-center">
                   <button (click)="openDetails(order)" class="w-9 h-9 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-all shadow-sm flex items-center justify-center mx-auto cursor-pointer">
                     <i class="ri-eye-line text-lg"></i>
                   </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <div class="md:hidden grid gap-4">
          <div *ngFor="let order of paginatedOrders" class="bg-[var(--bg-card)] p-5 rounded-2xl shadow-sm border border-[var(--border-color)] flex flex-col gap-4">
              <div class="flex justify-between items-start">
                  <div class="flex items-center gap-3">
                      <div class="w-10 h-10 rounded-full bg-[var(--bg-input)] flex items-center justify-center text-[var(--color-primary)] font-bold text-sm border border-[var(--border-color)]">
                          {{ getClientInitial(order) }}
                      </div>
                      <div>
                          <h3 class="font-bold text-[var(--text-main)] text-sm">
                              {{ getClientName(order) }}
                          </h3>
                          <span class="text-xs font-mono text-[var(--text-muted)] bg-[var(--bg-input)] px-1.5 py-0.5 rounded">#{{ order.pedidoId }}</span>
                      </div>
                  </div>
                  <p class="text-xs text-[var(--text-muted)] font-bold">{{ order.fechaPedido | date:'shortDate' }}</p>
              </div>

              <div class="grid grid-cols-2 gap-4 border-y border-[var(--border-color)] py-3 border-dashed">
                  <div>
                      <p class="text-[10px] text-[var(--text-muted)] uppercase font-bold">Total</p>
                      <p class="text-lg font-black text-[var(--text-main)]">S/ {{ order.total | number:'1.2-2' }}</p>
                  </div>
                  <div>
                      <p class="text-[10px] text-[var(--text-muted)] uppercase font-bold mb-1">Estado</p>
                      <select [ngModel]="order.estado?.estadoId" (ngModelChange)="changeStatus(order, $event)"
                        class="w-full py-1 px-2 rounded text-xs font-bold outline-none cursor-pointer ring-1 ring-inset appearance-none bg-transparent"
                        [ngClass]="getStatusColor(order.estado?.nombre)">
                        <option *ngFor="let s of statuses" [value]="s.estadoId">{{ s.nombre }}</option>
                      </select>
                  </div>
              </div>

              <button (click)="openDetails(order)" class="w-full py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-muted)] font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-colors border border-[var(--border-color)] flex items-center justify-center gap-2">
                  <i class="ri-eye-line"></i> Ver Detalles Completos
              </button>
          </div>
      </div>

      <div *ngIf="totalPages > 1" class="flex justify-between items-center bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm">
         <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1" class="px-4 py-2 rounded-lg text-sm font-bold border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-input)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors">
             <i class="ri-arrow-left-s-line"></i> Anterior
         </button>
         <span class="text-sm font-bold text-[var(--text-main)]">Página {{ currentPage }} de {{ totalPages }}</span>
         <button (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages" class="px-4 py-2 rounded-lg text-sm font-bold border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-input)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors">
             Siguiente <i class="ri-arrow-right-s-line"></i>
         </button>
      </div>

      <div *ngIf="selectedOrder" class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 backdrop-blur-md bg-slate-900/60 animate-fade-in">
        <div class="absolute inset-0" (click)="closeDetails()"></div>
        <div class="bg-[var(--bg-card)] w-full md:max-w-2xl h-[90vh] md:h-auto md:max-h-[85vh] rounded-t-3xl md:rounded-3xl shadow-2xl relative z-10 flex flex-col border border-[var(--border-color)] animate-slide-up">
          
          <div class="p-5 md:p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-input)] sticky top-0 z-20 rounded-t-3xl">
             <div class="flex items-center gap-4">
                 <div class="w-10 h-10 rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)] flex items-center justify-center text-xl shrink-0">
                     <i class="ri-file-list-3-line"></i>
                 </div>
                 <div>
                    <h3 class="text-lg md:text-xl font-bold text-[var(--text-main)]">Pedido #{{ selectedOrder.pedidoId }}</h3>
                    <p class="text-xs text-[var(--text-muted)]">{{ selectedOrder.fechaPedido | date:'medium' }}</p>
                 </div>
             </div>
             <button (click)="closeDetails()" class="w-9 h-9 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--color-error)] shadow-sm flex items-center justify-center transition-transform hover:rotate-90 cursor-pointer">
               <i class="ri-close-line text-xl"></i>
             </button>
          </div>
          
          <div class="flex-1 overflow-y-auto p-5 md:p-8 space-y-8 custom-scrollbar">
             <div *ngIf="loadingDetails" class="flex justify-center py-20">
               <i class="ri-loader-4-line animate-spin text-4xl text-[var(--color-primary)]"></i>
             </div>

             <div *ngIf="!loadingDetails">
                 
                 <div class="grid md:grid-cols-2 gap-6 mb-8">
                     <div class="bg-[var(--bg-input)]/50 p-5 rounded-2xl border border-[var(--border-color)]">
                         <h4 class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                             <i class="ri-user-smile-line"></i> Cliente
                         </h4>
                         <div class="flex items-start gap-3">
                             <div class="w-10 h-10 rounded-full bg-[var(--bg-card)] flex items-center justify-center border border-[var(--border-color)] font-bold text-[var(--text-main)] shrink-0">
                                 {{ getClientInitial(selectedOrder) }}
                             </div>
                             <div>
                                 <p class="font-bold text-[var(--text-main)] text-sm">
                                     {{ getClientName(selectedOrder) }}
                                 </p>
                                 <p class="text-xs text-[var(--text-muted)] mt-1">{{ selectedOrder.user?.email || 'Sin Email' }}</p>
                                 <p class="text-xs text-[var(--text-muted)] mt-0.5" *ngIf="selectedOrder.user?.telefono">{{ selectedOrder.user?.telefono }}</p>
                             </div>
                         </div>
                     </div>

                     <div class="bg-[var(--bg-input)]/50 p-5 rounded-2xl border border-[var(--border-color)]">
                         <h4 class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider mb-4 flex items-center gap-2">
                             <i class="ri-map-pin-line"></i> Envío
                         </h4>
                         <div class="text-sm text-[var(--text-main)]">
                             <p class="font-medium">
                                 {{ selectedOrder.direccionEnvio || 'Recojo en Tienda' }}
                             </p>
                         </div>
                     </div>
                 </div>

                 <h4 class="text-sm font-bold text-[var(--text-main)] mb-4 flex items-center gap-2">
                     <i class="ri-shopping-basket-line text-[var(--color-primary)]"></i> Productos ({{ orderDetails.length }})
                 </h4>
                 
                 <div class="space-y-3">
                     <div *ngFor="let item of orderDetails" class="flex gap-4 items-center bg-[var(--bg-card)] p-3 rounded-xl border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-colors group shadow-sm">
                        <div class="w-16 h-16 bg-white rounded-lg p-1 shrink-0 flex items-center justify-center border border-[var(--border-color)] overflow-hidden">
                           <img [src]="item.producto.imagenUrl || 'assets/images/no-image.png'" class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform">
                        </div>
                        <div class="flex-1 min-w-0">
                           <h4 class="font-bold text-[var(--text-main)] text-sm truncate">{{ item.producto.nombre }}</h4>
                           <div class="flex items-center gap-2 mt-1">
                               <span class="text-xs text-[var(--text-muted)] bg-[var(--bg-input)] px-2 py-0.5 rounded">Cant: {{ item.cantidad }}</span>
                           </div>
                        </div>
                        <p class="font-black text-[var(--text-main)]">S/ {{ item.precioUnitario | number:'1.2-2' }}</p>
                     </div>
                 </div>

             </div>
          </div>

          <div class="p-5 md:p-6 border-t border-[var(--border-color)] bg-[var(--bg-input)] flex justify-between items-center rounded-b-none md:rounded-b-3xl">
             <div class="text-xs text-[var(--text-muted)]">
                 <p>Subtotal: S/ {{ selectedOrder.subtotal || selectedOrder.total | number:'1.2-2' }}</p>
                 <p>Envío: S/ {{ selectedOrder.costoEnvio || 0 | number:'1.2-2' }}</p>
             </div>
             <div class="text-right">
                 <span class="block text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">Total Final</span>
                 <span class="text-2xl md:text-3xl font-black text-[var(--color-primary)]">S/ {{ selectedOrder.total | number:'1.2-2' }}</span>
             </div>
          </div>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
  `]
})
export class AdminOrdersComponent implements OnInit {
  private adminService = inject(AdminService);

  orders: any[] = [];
  statuses: any[] = [];
  currentPage = 1;
  itemsPerPage = 10;

  selectedOrder: any = null;
  orderDetails: any[] = [];
  loadingDetails = false;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getOrders().subscribe({
      next: (data) => {
        this.orders = data.sort((a, b) => new Date(b.fechaPedido).getTime() - new Date(a.fechaPedido).getTime());
        console.log("Pedidos cargados:", this.orders);
      },
      error: (err) => console.error("Error cargando pedidos:", err)
    });
    this.adminService.getOrderStatuses().subscribe(data => this.statuses = data);
  }

  getClientName(order: any): string {
    if (!order) return 'Desconocido';

    if (order.user) {
      return order.user.nombreCompleto || order.user.nombre || order.user.username || order.user.email || 'Cliente';
    }

    if (order.usuario) {
      return order.usuario.nombreCompleto || order.usuario.nombre || 'Cliente';
    }

    return 'Cliente Visitante';
  }

  getClientInitial(order: any): string {
    const name = this.getClientName(order);
    return name.charAt(0).toUpperCase();
  }

  get totalPages() { return Math.ceil(this.orders.length / this.itemsPerPage) || 1; }
  get paginatedOrders() { const start = (this.currentPage - 1) * this.itemsPerPage; return this.orders.slice(start, start + this.itemsPerPage); }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getStatusColor(statusName: string): string {
    const name = statusName?.toLowerCase() || '';
    if (name === 'pendiente') return 'bg-yellow-100 text-yellow-700 ring-1 ring-yellow-600/30';
    if (name === 'pagado') return 'bg-blue-100 text-blue-700 ring-1 ring-blue-600/30';
    if (name === 'enviado') return 'bg-purple-100 text-purple-700 ring-1 ring-purple-600/30';
    if (name === 'entregado') return 'bg-green-100 text-green-700 ring-1 ring-green-600/30';
    if (name === 'cancelado') return 'bg-red-100 text-red-700 ring-1 ring-red-600/30';
    return 'bg-gray-100 text-gray-600 ring-1 ring-gray-400/30';
  }

  changeStatus(order: any, newStatusId: string) {
    const id = Number(newStatusId);
    const oldStatus = order.estado;
    this.adminService.updateOrderStatus(order.pedidoId, id).subscribe({
      next: () => {
        const Toast = Swal.mixin({ toast: true, position: 'bottom-end', showConfirmButton: false, timer: 2000, background: 'var(--bg-card)', color: 'var(--text-main)' });
        Toast.fire({ icon: 'success', title: 'Estado actualizado' });
        const newStatusObj = this.statuses.find(s => s.estadoId === id);
        if (newStatusObj) order.estado = newStatusObj;
      },
      error: () => {
        Swal.fire('Error', 'No se pudo cambiar el estado', 'error');
        order.estado = oldStatus;
      }
    });
  }

  openDetails(order: any) {
    this.selectedOrder = order;
    this.orderDetails = [];
    this.loadingDetails = true;
    document.body.style.overflow = 'hidden';

    this.adminService.getOrderDetails(order.pedidoId).subscribe({
      next: (data) => {
        this.orderDetails = data;
        this.loadingDetails = false;
      },
      error: () => this.loadingDetails = false
    });
  }

  closeDetails() {
    this.selectedOrder = null;
    document.body.style.overflow = 'auto';
  }
}