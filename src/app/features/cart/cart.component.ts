import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  template: `
    <app-navbar></app-navbar>

    <div class="container mx-auto px-4 py-10 max-w-6xl">
      
      <h1 class="text-3xl font-black text-main mb-8 flex items-center gap-3">
        <i class="ri-shopping-bag-3-fill text-primary"></i> Tu Carrito de Compras
      </h1>

      <div *ngIf="cartService.count() === 0" class="text-center py-20 bg-card rounded-3xl border border-dashed border-theme shadow-sm">
        <div class="inline-flex bg-input p-6 rounded-full mb-6">
            <i class="ri-shopping-cart-line text-6xl text-muted opacity-50"></i>
        </div>
        <h2 class="text-2xl font-bold text-main mb-2">Tu carrito está vacío</h2>
        <p class="text-muted mb-8 max-w-md mx-auto">Parece que aún no te decides. Explora nuestro catálogo y encuentra la mejor tecnología.</p>
        <a routerLink="/" class="bg-primary hover:bg-secondary text-white px-8 py-3 rounded-full font-bold transition-all shadow-lg shadow-primary/30 transform hover:-translate-y-1 inline-flex items-center gap-2">
          Volver al Catálogo <i class="ri-arrow-right-line"></i>
        </a>
      </div>

      <div *ngIf="cartService.count() > 0" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        <div class="lg:col-span-2 space-y-4">
          <div *ngFor="let item of cartService.cartItems()" class="bg-card p-4 rounded-2xl border border-theme flex items-center gap-4 hover:shadow-md transition-shadow group">
            
            <div class="w-24 h-24 rounded-xl bg-input flex items-center justify-center p-2 shrink-0">
               <img [src]="item.imagenUrl || 'https://via.placeholder.com/100'" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal">
            </div>
            
            <div class="flex-1 min-w-0">
              <h3 class="text-main font-bold text-lg truncate">{{ item.nombre }}</h3>
              <p class="text-primary font-bold text-xl">S/ {{ item.precio }}</p>
              <p class="text-xs text-muted">SKU: {{ item.id || item.productoId }}</p>
            </div>

            <div class="flex flex-col items-end gap-2">
              <div class="flex items-center bg-input rounded-lg border border-theme h-9">
                <button (click)="updateQty(item, -1)" class="px-3 h-full text-muted hover:text-primary transition-colors" [disabled]="item.cantidad <= 1">-</button>
                <span class="px-2 text-sm text-main font-bold w-8 text-center">{{ item.cantidad }}</span>
                <button (click)="updateQty(item, 1)" class="px-3 h-full text-muted hover:text-primary transition-colors" [disabled]="item.cantidad >= item.stock">+</button>
              </div>

              <button (click)="removeItem(item.id || item.productoId)" class="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1 hover:underline cursor-pointer">
                <i class="ri-delete-bin-line"></i> Eliminar
              </button>
            </div>
          </div>
        </div>

        <div class="bg-card p-6 rounded-3xl border border-theme h-fit sticky top-24 shadow-sm">
          <h3 class="text-xl font-bold text-main mb-6 pb-4 border-b border-theme">Resumen del Pedido</h3>
          
          <div class="space-y-3 text-sm mb-6">
            <div class="flex justify-between text-muted">
              <span>Subtotal</span>
              <span class="font-medium text-main">S/ {{ cartService.total() | number:'1.2-2' }}</span>
            </div>
            <div class="flex justify-between text-muted">
              <span>Envío estimado</span>
              <span class="font-medium text-main">S/ 15.00</span>
            </div>
            
            <div class="flex justify-between items-center bg-primary/5 p-2 rounded-lg border border-primary/10" *ngIf="descuentoNivel > 0">
              <span class="text-primary font-bold flex items-center gap-1">
                 <i class="ri-vip-crown-line"></i> Nivel {{ nombreNivel }}
              </span>
              <span class="text-primary font-bold">- S/ {{ calcularDescuento() | number:'1.2-2' }}</span>
            </div>
          </div>

          <div class="flex justify-between items-end mb-8 pt-4 border-t border-theme">
            <span class="text-main font-bold text-lg">Total a Pagar</span>
            <span class="text-3xl font-black text-main">S/ {{ calcularTotalFinal() | number:'1.2-2' }}</span>
          </div>

          <button 
            (click)="procesarCompra()"
            [disabled]="isProcessing"
            class="w-full py-4 bg-primary hover:bg-secondary text-white font-bold rounded-xl shadow-lg hover:shadow-primary/30 transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer text-lg flex items-center justify-center gap-2">
            <span *ngIf="!isProcessing">PAGAR AHORA <i class="ri-bank-card-fill"></i></span>
            <span *ngIf="isProcessing"><i class="ri-loader-4-line animate-spin"></i> Procesando...</span>
          </button>
          
          <div class="mt-4 flex justify-center gap-4 text-2xl text-muted opacity-50">
             <i class="ri-visa-line"></i>
             <i class="ri-mastercard-line"></i>
             <i class="ri-paypal-line"></i>
          </div>
          <p class="text-[10px] text-center text-muted mt-2 flex items-center justify-center gap-1">
            <i class="ri-lock-line"></i> Pago procesado de forma 100% segura
          </p>
        </div>

      </div>
    </div>
  `
})
export class CartComponent {
  public cartService = inject(CartService);
  private authService = inject(AuthService);
  private http = inject(HttpClient);
  private router = inject(Router);

  isProcessing = false;
  descuentoNivel = 0;
  nombreNivel = 'Bronce';

  constructor() {
    const user = this.authService.getUser();
    if (user && user.descuentoActual) {
      this.descuentoNivel = user.descuentoActual;
      this.nombreNivel = user.nivelActual || 'Miembro';
    }
  }

  updateQty(item: any, delta: number) {
    this.cartService.addToCart(item, delta);
  }

  removeItem(id: number) {
    this.cartService.removeFromCart(id);
  }

  calcularDescuento(): number {
    return (this.cartService.total() * this.descuentoNivel) / 100;
  }

  calcularTotalFinal(): number {
    return this.cartService.total() + 15 - this.calcularDescuento();
  }

  procesarCompra() {
    if (!this.authService.isLoggedIn()) {
      Swal.fire({
        icon: 'warning',
        title: 'Inicia Sesión',
        text: 'Debes estar registrado para comprar y ganar puntos.',
        confirmButtonText: 'Ir al Login',
        confirmButtonColor: '#0ea5e9'
      }).then(() => this.router.navigate(['/login']));
      return;
    }

    this.isProcessing = true;

    const itemsParaBackend = this.cartService.cartItems().map(item => ({
      productoId: item.productoId || item.id,
      cantidad: item.cantidad
    }));

    const compraRequest = {
      metodoPago: 'Tarjeta Crédito',
      items: itemsParaBackend
    };

    this.http.post('http://localhost:8080/api/checkout/buy', compraRequest).subscribe({
      next: (res: any) => {
        this.isProcessing = false;
        this.cartService.clearCart();

        let mensaje = 'Tu pedido ha sido procesado correctamente.';
        let titulo = '¡Compra Exitosa!';

        if (res.subioNivel) {
          titulo = '¡SUBISTE DE NIVEL! 🏆';
          mensaje = `Has ascendido a nivel <b>${res.nuevoNivel}</b>. ¡Disfruta tus nuevos descuentos!`;
        }

        Swal.fire({
          icon: 'success',
          title: titulo,
          html: mensaje,
          confirmButtonColor: '#10b981',
          confirmButtonText: 'Ver mis Pedidos'
        }).then(() => {
          this.router.navigate(['/profile']);
        });
      },
      error: (err) => {
        this.isProcessing = false;
        let mensajeError = 'No se pudo procesar el pago.';
        if (typeof err.error === 'string') mensajeError = err.error;
        else if (err.error && err.error.message) mensajeError = err.error.message;

        Swal.fire({
          icon: 'error',
          title: 'Error en la compra',
          text: mensajeError,
          confirmButtonColor: '#ef4444'
        });
      }
    });
  }
}