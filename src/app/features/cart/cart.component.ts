import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { CartService } from './services/cart.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';

import { API_ROUTES } from '../../core/api/api-routes';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NavbarComponent, RouterLink],
  templateUrl: './cart.html'
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

    const itemsParaBackend = this.cartService.cartItems().map((item: any) => ({
      productoId: item.productoId || item.id,
      cantidad: item.cantidad
    }));

    const compraRequest = {
      metodoPago: 'Tarjeta Crédito',
      items: itemsParaBackend
    };

    this.http.post(API_ROUTES.orders.checkoutBuy, compraRequest).subscribe({
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
      error: (err: any) => {
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