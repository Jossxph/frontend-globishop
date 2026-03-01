import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileService } from '../../services/profile.service';
import { OrderService } from '../../../order/services/order.service';
import { RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-order-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="bg-card border border-theme rounded-2xl overflow-hidden shadow-sm animate-fade-in-up">
      <div class="p-4 border-b border-theme bg-input flex justify-between items-center">
         <h3 class="font-bold text-main">Historial de Compras</h3>
         <span class="text-xs text-muted bg-card px-2 py-1 rounded border border-theme">{{ orders.length }} pedidos</span>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full text-left">
          <thead class="bg-input/50 text-muted text-xs uppercase border-b border-theme">
            <tr>
              <th class="p-4">ID</th>
              <th class="p-4 hidden sm:table-cell">Fecha</th>
              <th class="p-4">Total</th>
              <th class="p-4">Estado</th>
              <th class="p-4 text-center">Acción</th>
            </tr>
          </thead>
          <tbody class="text-sm">
            <tr *ngFor="let order of orders" class="border-b border-theme last:border-0 hover:bg-input transition-colors">
              <td class="p-4 font-mono font-bold text-primary">#{{ order.pedidoId }}</td>
              <td class="p-4 hidden sm:table-cell text-muted">{{ order.fechaPedido | date:'dd MMM yyyy' }}</td>
              <td class="p-4 font-bold text-main">S/ {{ order.total }}</td>
              <td class="p-4">
                <span [class]="getEstadoClass(order.estado?.nombre)" class="px-2.5 py-1 rounded-full text-[10px] font-bold border border-current opacity-90 inline-flex items-center gap-1">
                  <span class="w-1.5 h-1.5 rounded-full bg-current"></span> {{ order.estado?.nombre || 'PENDIENTE' }}
                </span>
              </td>
              
              <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-2">
                  <button (click)="openOrderDetail(order)" class="w-8 h-8 rounded-full bg-input hover:bg-primary hover:text-white transition-colors flex items-center justify-center cursor-pointer text-muted shadow-sm border border-theme" title="Ver Detalle">
                    <i class="ri-eye-line"></i>
                  </button>

                  <!-- Boleta PDF -->
                  <button (click)="downloadBoleta(order.pedidoId)" title="Ver Boleta"
                      class="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <i class="ri-file-text-line"></i>
                  </button>

                  <!-- Devolución: solo si estado < 3 y dentro de 48h -->
                  <button *ngIf="order.estado?.estadoId < 3 && canRefund(order.fechaPedido)" (click)="requestRefund(order)"
                      title="Solicitar Devolución"
                      class="w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 flex items-center justify-center transition-colors">
                      <i class="ri-refund-2-line"></i>
                  </button>
                </div>
              </td>
            </tr>

            <tr *ngIf="orders.length === 0 && !loading">
              <td colspan="5" class="p-12 text-center">
                <div class="inline-flex bg-input p-4 rounded-full mb-3"><i class="ri-shopping-bag-3-line text-2xl text-muted"></i></div>
                <p class="text-muted">Aún no has realizado ninguna compra.</p>
                <a routerLink="/" class="text-primary font-bold hover:underline text-sm mt-2 block cursor-pointer">Ir al catálogo</a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Modal detalle -->
    <div *ngIf="selectedOrder" class="fixed inset-0 z-[100] flex items-center justify-center px-4 animate-fade-in-up">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" (click)="selectedOrder = null"></div>
      
      <div class="bg-card w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden border border-theme flex flex-col max-h-[80vh]">
        <div class="p-5 border-b border-theme flex justify-between items-center bg-input/50">
           <div>
             <h3 class="text-lg font-bold text-main">Pedido #{{ selectedOrder.pedidoId }}</h3>
             <p class="text-xs text-muted">{{ selectedOrder.fechaPedido | date:'medium' }}</p>
           </div>
           <button (click)="selectedOrder = null" class="w-8 h-8 rounded-full bg-card hover:bg-red-50 text-muted hover:text-red-500 flex items-center justify-center cursor-pointer transition-colors border border-theme">
             <i class="ri-close-line text-xl"></i>
           </button>
        </div>
        
        <div class="p-5 overflow-y-auto space-y-4">
           <div *ngIf="loadingDetails" class="text-center py-10">
             <i class="ri-loader-4-line animate-spin text-3xl text-primary"></i>
             <p class="text-xs text-muted mt-2">Cargando productos...</p>
           </div>

           <ng-container *ngIf="!loadingDetails">
             <!-- El backend devuelve { pedido, detalles } -->
             <div *ngFor="let item of orderDetails" class="flex gap-4 items-center bg-input/30 p-3 rounded-2xl border border-theme">
                <div class="w-16 h-16 bg-card rounded-xl p-1 shrink-0 flex items-center justify-center border border-theme">
                   <img [src]="'https://via.placeholder.com/60'" class="max-w-full max-h-full object-contain">
                </div>
                <div class="flex-1 min-w-0">
                  <h4 class="font-bold text-main text-sm">Producto ID: {{ item.productoId }}</h4>
                  <p class="text-xs text-muted mt-0.5">Cantidad: <span class="font-bold text-main">{{ item.cantidad }}</span></p>
                </div>
                <p class="font-black text-main text-lg">S/ {{ item.precioUnitario }}</p>
             </div>
           </ng-container>
        </div>

        <div class="p-5 border-t border-theme bg-card flex justify-between items-end">
           <span class="text-muted text-sm font-medium">Total Pagado</span>
           <span class="text-3xl font-black text-main">S/ {{ selectedOrder.total }}</span>
        </div>
      </div>
    </div>
  `
})
export class OrderHistoryComponent implements OnInit {
  private profileService = inject(ProfileService);
  private orderService = inject(OrderService);

  orders: any[] = [];
  loading = true;

  selectedOrder: any = null;
  orderDetails: any[] = [];
  loadingDetails = false;

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.loading = true;
    this.profileService.getOrders().subscribe({
      next: (data: any) => {
        this.orders = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  // ✅ CORREGIDO: usa /api/orders/{id}/boleta
  downloadBoleta(orderId: number) {
    Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 2000 })
        .fire({ icon: 'info', title: 'Generando PDF...' });

    this.orderService.downloadBoleta(orderId).subscribe({
      next: (blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => window.URL.revokeObjectURL(url), 10000);
      },
      error: () => Swal.fire('Error', 'No se pudo descargar la boleta.', 'error')
    });
  }

  openOrderDetail(order: any) {
    this.selectedOrder = order;
    this.orderDetails = [];
    this.loadingDetails = true;
    this.profileService.getOrderDetail(order.pedidoId).subscribe({
      next: (res: any) => {
        // backend devuelve { pedido, detalles }
        this.orderDetails = res?.detalles || res || [];
        this.loadingDetails = false;
      },
      error: () => this.loadingDetails = false
    });
  }

  // ✅ CORREGIDO: usa /api/orders/{id}/devolucion (sin código)
  requestRefund(order: any) {
    Swal.fire({
      title: '¿Solicitar Devolución?',
      html: `<p class="text-sm text-gray-500">Se cancelará el pedido <b>#${order.pedidoId}</b> y se procesará el reembolso.</p>`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, devolver',
      confirmButtonColor: '#dc2626',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.orderService.requestRefund(order.pedidoId).subscribe({
          next: (res: any) => {
            Swal.fire('¡Devolución procesada!', res.message || 'Tu pedido fue cancelado.', 'success');
            this.loadOrders();
          },
          error: (err: any) => Swal.fire('Error', err.error?.message || 'No se pudo procesar.', 'error')
        });
      }
    });
  }

  canRefund(dateString: string): boolean {
    const orderDate = new Date(dateString);
    const now = new Date();
    const diffHours = Math.abs(now.getTime() - orderDate.getTime()) / 36e5;
    return diffHours <= 48;
  }

  getEstadoClass(estado: string): string {
    const e = estado ? estado.toLowerCase() : '';
    if (e.includes('pagado')) return 'text-blue-500 border-blue-500';
    if (e.includes('enviado')) return 'text-orange-500 border-orange-500';
    if (e.includes('entregado')) return 'text-green-500 border-green-500';
    if (e.includes('cancelado')) return 'text-red-500 border-red-500';
    return 'text-gray-500 border-gray-500';
  }
}