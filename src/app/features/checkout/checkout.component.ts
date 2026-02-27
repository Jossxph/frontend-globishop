import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { OrderService } from '../../core/services/order.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarComponent, RouterLink],
  template: `
    <app-navbar></app-navbar>

    <div class="min-h-screen bg-[var(--bg-main)] pt-24 pb-12 px-4 md:px-8 font-sans animate-fade-in">
      
      <div class="max-w-7xl mx-auto">
        
        <div class="mb-8 md:mb-12">
          <h1 class="text-3xl md:text-4xl font-black text-[var(--text-main)] tracking-tight flex items-center gap-3">
            <i class="ri-secure-payment-fill text-[var(--color-primary)]"></i> 
            Finalizar Compra
          </h1>
          <p class="text-[var(--text-muted)] mt-2 text-sm md:text-base">Completa tus datos para procesar el envío de forma segura.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8 lg:gap-12 items-start">
          
          <div class="space-y-8">
            
            <div class="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-sm group hover:border-[var(--color-primary)] transition-colors duration-300">
              
              <div class="absolute -left-3 top-6 md:-left-4 bg-[var(--color-primary)] text-white w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-black shadow-lg shadow-[var(--color-primary)]/30 z-10 border-4 border-[var(--bg-main)]">1</div>
              
              <h2 class="text-xl font-bold text-[var(--text-main)] mb-6 pl-6 flex items-center gap-2">
                Datos de Envío
                <i class="ri-truck-line text-[var(--text-muted)] opacity-50"></i>
              </h2>

              <form [formGroup]="checkoutForm" class="grid grid-cols-1 md:grid-cols-2 gap-5 pl-2 md:pl-4">
                
                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">Distrito</label>
                  <div class="relative group/input">
                      <i class="ri-map-pin-2-line absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within/input:text-[var(--color-primary)] transition-colors"></i>
                      <select formControlName="distrito" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl pl-10 pr-10 py-3.5 text-[var(--text-main)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all appearance-none cursor-pointer">
                          <option value="" disabled selected>Selecciona distrito...</option>
                          <option *ngFor="let d of distritosLima" [value]="d">{{ d }}</option>
                      </select>
                      <i class="ri-arrow-down-s-line absolute right-4 top-3.5 text-[var(--text-muted)] pointer-events-none"></i>
                  </div>
                  <p *ngIf="isFieldInvalid(checkoutForm, 'distrito')" class="text-[var(--color-error)] text-xs ml-1 font-medium">Requerido</p>
                </div>

                <div class="space-y-1.5">
                  <label class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">Celular</label>
                  <div class="relative group/input">
                      <i class="ri-smartphone-line absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within/input:text-[var(--color-primary)] transition-colors"></i>
                      <input formControlName="telefono" type="tel" maxlength="9" (input)="allowOnlyNumbers($event)" placeholder="999 000 000" 
                             class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl pl-10 pr-4 py-3.5 text-[var(--text-main)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all font-mono tracking-wide placeholder:text-[var(--text-muted)]/40">
                  </div>
                  <p *ngIf="isFieldInvalid(checkoutForm, 'telefono')" class="text-[var(--color-error)] text-xs ml-1 font-medium">9 dígitos requeridos</p>
                </div>

                <div class="md:col-span-2 space-y-1.5">
                  <label class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-wider ml-1">Dirección Exacta y Referencia</label>
                  <div class="relative group/input">
                      <i class="ri-home-4-line absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within/input:text-[var(--color-primary)] transition-colors"></i>
                      <input formControlName="direccion" type="text" placeholder="Av. Larco 123, Miraflores (Frente al parque)" 
                             class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-2xl pl-10 pr-4 py-3.5 text-[var(--text-main)] outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]/40">
                  </div>
                  <p *ngIf="isFieldInvalid(checkoutForm, 'direccion')" class="text-[var(--color-error)] text-xs ml-1 font-medium">Dirección obligatoria</p>
                </div>

              </form>
            </div>

            <div class="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-sm group hover:border-[var(--color-primary)] transition-colors duration-300">
              
              <div class="absolute -left-3 top-6 md:-left-4 bg-[var(--bg-card)] text-[var(--text-muted)] border-2 border-[var(--border-color)] w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center font-bold shadow-sm z-10">2</div>

              <h2 class="text-xl font-bold text-[var(--text-main)] mb-6 pl-6 flex items-center gap-2">
                Pago Seguro
                <i class="ri-lock-2-line text-[var(--color-success)]"></i>
              </h2>

              <div class="pl-2 md:pl-4">
                  <div class="flex gap-4 mb-6">
                    <button class="flex-1 py-4 rounded-2xl border-2 border-[var(--color-primary)] bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-bold flex flex-col items-center justify-center gap-1 shadow-sm relative overflow-hidden transition-transform active:scale-95">
                        <i class="ri-bank-card-2-fill text-2xl"></i>
                        <span class="text-xs">Tarjeta</span>
                        <i class="ri-checkbox-circle-fill absolute top-2 right-2 text-[var(--color-primary)]"></i>
                    </button>
                    <button class="flex-1 py-4 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-muted)] font-bold flex flex-col items-center justify-center gap-1 opacity-60 cursor-not-allowed">
                        <i class="ri-paypal-fill text-2xl"></i>
                        <span class="text-xs">PayPal</span>
                    </button>
                  </div>

                  <form [formGroup]="cardForm" class="space-y-5 bg-[var(--bg-input)] p-5 rounded-2xl border border-[var(--border-color)] border-dashed">
                    
                    <div class="flex justify-between items-center mb-1">
                        <span class="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">Información de Tarjeta</span>
                        <div class="flex gap-2 opacity-70 grayscale hover:grayscale-0 transition-all">
                            <i class="ri-visa-line text-2xl text-blue-600"></i>
                            <i class="ri-mastercard-fill text-2xl text-red-500"></i>
                        </div>
                    </div>

                    <div class="relative group/input">
                        <i class="ri-bank-card-line absolute left-4 top-3.5 text-[var(--text-muted)] group-focus-within/input:text-[var(--color-primary)]"></i>
                        <input formControlName="number" type="text" maxlength="19" (input)="formatCardNumber($event)" placeholder="0000 0000 0000 0000" 
                               class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-[var(--text-main)] font-mono text-lg outline-none focus:border-[var(--color-primary)] transition-all tracking-wide placeholder:text-[var(--text-muted)]/30">
                    </div>

                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1">
                            <input formControlName="expiry" type="text" maxlength="5" (input)="formatExpiry($event)" placeholder="MM/YY" 
                                   class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] text-center outline-none focus:border-[var(--color-primary)] transition-all font-mono placeholder:text-[var(--text-muted)]/30">
                        </div>
                        <div class="space-y-1 relative group/cvv">
                            <input formControlName="cvv" type="password" maxlength="3" (input)="allowOnlyNumbers($event)" placeholder="CVV" 
                                   class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] text-center outline-none focus:border-[var(--color-primary)] transition-all font-mono placeholder:text-[var(--text-muted)]/30">
                            <i class="ri-information-line absolute right-3 top-3.5 text-[var(--text-muted)] text-sm cursor-help opacity-50"></i>
                        </div>
                    </div>

                    <div class="space-y-1">
                        <input formControlName="name" type="text" placeholder="NOMBRE DEL TITULAR" 
                               class="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] uppercase text-xs font-bold outline-none focus:border-[var(--color-primary)] transition-all placeholder:text-[var(--text-muted)]/30">
                    </div>

                  </form>
              </div>
            </div>

          </div>

          <div class="lg:sticky lg:top-28 space-y-6">
            
            <div class="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-xl overflow-hidden relative">
                
                <div class="absolute top-0 right-0 w-32 h-32 bg-[var(--color-primary)]/5 rounded-bl-full -mr-10 -mt-10 pointer-events-none"></div>

                <h3 class="text-lg font-black text-[var(--text-main)] mb-6 flex items-center justify-between">
                    Tu Pedido
                    <span class="text-xs bg-[var(--bg-input)] border border-[var(--border-color)] px-2 py-1 rounded-lg text-[var(--text-muted)]">{{ cartItems.length }} items</span>
                </h3>

                <div class="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    <div *ngFor="let item of cartItems" class="flex gap-4 group">
                        <div class="w-16 h-16 bg-white rounded-xl border border-[var(--border-color)] p-1 shrink-0 flex items-center justify-center relative overflow-hidden">
                            <img [src]="item.imagenUrl || 'assets/images/no-image.png'" class="max-h-full object-contain group-hover:scale-110 transition-transform">
                        </div>
                        <div class="flex-1 min-w-0 flex flex-col justify-center">
                            <p class="text-sm font-bold text-[var(--text-main)] truncate leading-tight">{{ item.nombre }}</p>
                            <p class="text-xs text-[var(--text-muted)] mt-1">x{{ item.cantidad }}</p>
                        </div>
                        <div class="flex flex-col justify-center text-right">
                            <p class="text-sm font-black text-[var(--text-main)]">S/ {{ item.precio * item.cantidad | number:'1.2-2' }}</p>
                        </div>
                    </div>
                </div>

                <div class="border-t border-[var(--border-color)] border-dashed pt-4 space-y-3 mb-6 bg-[var(--bg-input)]/30 -mx-6 px-6 pb-4">
                    <div class="flex justify-between text-sm text-[var(--text-muted)]">
                        <span>Subtotal</span>
                        <span class="font-medium">S/ {{ total | number:'1.2-2' }}</span>
                    </div>
                    <div class="flex justify-between text-sm text-[var(--text-muted)]">
                        <span>Envío</span>
                        <span class="font-medium text-[var(--color-success)]">S/15</span>
                    </div>
                    <div class="flex justify-between items-end pt-2 border-t border-[var(--border-color)]">
                        <span class="text-sm font-bold text-[var(--text-main)]">Total Final</span>
                        <span class="text-3xl font-black text-[var(--color-primary)]">S/ {{ total + 15 | number:'1.2-2' }}</span>
                    </div>
                </div>

                <button (click)="processPayment()" 
                        [disabled]="isProcessing || cartItems.length === 0"
                        class="w-full bg-[var(--color-primary)] hover:brightness-110 text-white font-bold py-4 rounded-2xl shadow-lg shadow-[var(--color-primary)]/30 hover:-translate-y-1 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none">
                    
                    <span *ngIf="!isProcessing" class="flex items-center gap-2">
                        Pagar Ahora <i class="ri-arrow-right-line"></i>
                    </span>
                    <span *ngIf="isProcessing" class="flex items-center gap-2">
                        <i class="ri-loader-4-line animate-spin text-xl"></i> Procesando...
                    </span>
                </button>

                <div class="mt-4 flex justify-center gap-4 text-[var(--text-muted)] opacity-50">
                    <i class="ri-visa-line text-xl"></i>
                    <i class="ri-mastercard-line text-xl"></i>
                    <i class="ri-secure-payment-line text-xl"></i>
                </div>

            </div>

            <div class="bg-[var(--bg-input)] rounded-2xl p-4 flex items-start gap-3 border border-[var(--border-color)]">
                <i class="ri-shield-check-line text-2xl text-[var(--color-success)]"></i>
                <div>
                    <p class="text-xs font-bold text-[var(--text-main)]">Compra Protegida</p>
                    <p class="text-[10px] text-[var(--text-muted)] leading-tight mt-1">Si no recibes el producto que esperabas, te devolvemos tu dinero.</p>
                </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  `,
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
    this.cartService.cartItems$.subscribe(items => this.cartItems = items);
    this.cartService.cartTotal$.subscribe(t => this.total = t);

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
      items: this.cartItems.map(item => ({
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