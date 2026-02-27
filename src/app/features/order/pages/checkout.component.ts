import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../cart/services/cart.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { OrderService } from '../services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './checkout.html',
  styles: [`
    .animate-fade-in { animation: fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
    
    .custom-scrollbar::-webkit-scrollbar { width: 4px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 4px; }
  `]
})
export class CheckoutComponent implements OnInit {
  private fb = inject(FormBuilder);
  public cartService = inject(CartService);
  private router = inject(Router);
  private orderService = inject(OrderService);

  cartItems: any[] = [];
  total = 0;
  isProcessing = false;

  distritosLima = [
    'Lima', 'Ancón', 'Ate', 'Barranco', 'Breña', 'Carabayllo', 'Chaclacayo', 'Chorrillos',
    'Cieneguilla', 'Comas', 'El Agustino', 'Independencia', 'Jesús María', 'La Molina',
    'La Victoria', 'Lince', 'Los Olivos', 'Lurigancho', 'Lurín', 'Magdalena del Mar',
    'Miraflores', 'Pachacámac', 'Pucusana', 'Pueblo Libre', 'Puente Piedra', 'Punta Hermosa',
    'Punta Negra', 'Rímac', 'San Bartolo', 'San Borja', 'San Isidro', 'San Juan de Lurigancho',
    'San Juan de Miraflores', 'San Luis', 'San Martín de Porres', 'San Miguel',
    'Santa Anita', 'Santa María del Mar', 'Santa Rosa', 'Santiago de Surco',
    'Surquillo', 'Villa El Salvador', 'Villa María del Triunfo'
  ];

  checkoutForm: FormGroup = this.fb.group({
    direccion: ['', Validators.required],
    distrito: ['', Validators.required],
    telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]]
  });

  cardForm: FormGroup = this.fb.group({
    number: ['', [Validators.required, Validators.minLength(19)]], // 16 nums + 3 espacios
    name: ['', Validators.required],
    expiry: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
    cvv: ['', [Validators.required, Validators.pattern(/^[0-9]{3,4}$/)]]
  });

  ngOnInit() {
    this.cartService.cartItems$.subscribe((items: any) => this.cartItems = items);
    this.cartService.cartTotal$.subscribe((t: any) => this.total = t);

    if (this.cartService.count() === 0) {
      this.router.navigate(['/']);
    }
  }

  isFieldInvalid(form: FormGroup, field: string): boolean {
    const control = form.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  allowOnlyNumbers(event: any) {
    const input = event.target;
    input.value = input.value.replace(/[^0-9]/g, '');
    const controlName = input.getAttribute('formControlName');
    if (controlName) {
      if (this.checkoutForm.get(controlName)) this.checkoutForm.get(controlName)?.setValue(input.value);
      if (this.cardForm.get(controlName)) this.cardForm.get(controlName)?.setValue(input.value);
    }
  }

  formatCardNumber(event: any) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 16);
    let formatted = input != '' ? input.match(/.{1,4}/g)?.join(' ') : '';
    event.target.value = formatted;
    this.cardForm.get('number')?.setValue(formatted);
  }

  formatExpiry(event: any) {
    let input = event.target.value.replace(/\D/g, '').substring(0, 4);
    if (input.length >= 2) {
      input = input.substring(0, 2) + '/' + input.substring(2);
    }
    event.target.value = input;
    this.cardForm.get('expiry')?.setValue(input);
  }

  processPayment() {
    this.checkoutForm.markAllAsTouched();
    this.cardForm.markAllAsTouched();

    if (this.checkoutForm.invalid) {
      this.scrollToError();
      return;
    }

    if (this.cardForm.invalid) {
      Swal.fire({ icon: 'error', title: 'Tarjeta Inválida', text: 'Revisa los datos de pago.', confirmButtonColor: '#ef4444', background: 'var(--bg-card)', color: 'var(--text-main)' });
      return;
    }

    this.isProcessing = true;

    const fullAddress = `${this.checkoutForm.value.direccion}, ${this.checkoutForm.value.distrito}, Lima`;
    const orderData = {
      direccion: fullAddress,
      telefono: this.checkoutForm.value.telefono,
      total: this.total + 15,
      items: this.cartItems.map((item: any) => ({
        productoId: item.productoId || item.id,
        cantidad: item.cantidad,
        precio: item.precio
      }))
    };

    setTimeout(() => {
      this.orderService.createOrder(orderData).subscribe({
        next: (res: any) => {
          this.isProcessing = false;
          this.cartService.clearCart();
          const orderId = res.pedidoId || res.id;
          this.router.navigate(['/checkout/success', orderId]);
        },
        error: (err: any) => {
          this.isProcessing = false;
          console.error(err);
          Swal.fire({ icon: 'error', title: 'Error', text: 'No se pudo procesar el pago.', background: 'var(--bg-card)', color: 'var(--text-main)' });
        }
      });
    }, 2000);
  }

  scrollToError() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}