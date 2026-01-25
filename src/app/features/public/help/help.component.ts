import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';

interface HelpTopic {
    id: string;
    icon: string;
    color: string;
    title: string;
    subtitle: string;
    content: string;
}

@Component({
    selector: 'app-help',
    standalone: true,
    imports: [CommonModule, NavbarComponent, FooterComponent],
    template: `
    <app-navbar></app-navbar>

    <main class="min-h-screen bg-[var(--bg-main)] font-sans pt-24 pb-20">
      
      <section class="relative bg-[var(--bg-card)] border-b border-[var(--border-color)] py-16 md:py-20 px-4 text-center overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/grid-me.png')] opacity-[0.03]"></div>
        
        <div class="relative z-10 max-w-3xl mx-auto space-y-4">
          <span class="inline-block py-1 px-3 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)] border border-[var(--color-primary)]/20 text-xs font-bold uppercase tracking-widest">
            Centro de Ayuda
          </span>
          <h1 class="text-4xl md:text-5xl font-black text-[var(--text-main)] tracking-tight">
            Todo lo que necesitas saber
          </h1>
          <p class="text-[var(--text-muted)] text-lg max-w-xl mx-auto">
            Selecciona un tema para ver la guía rápida sin salir de esta página.
          </p>
        </div>
      </section>

      <section class="max-w-7xl mx-auto px-4 -mt-8 relative z-20">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div *ngFor="let topic of topics" 
                 (click)="openModal(topic)"
                 class="group bg-[var(--bg-card)] p-6 rounded-2xl border border-[var(--border-color)] shadow-lg hover:shadow-2xl hover:border-[var(--color-primary)] transition-all cursor-pointer relative overflow-hidden">
                
                <div class="absolute top-0 right-0 w-24 h-24 bg-[var(--color-primary)]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 group-hover:bg-[var(--color-primary)]/10"></div>

                <div class="flex items-start gap-4 relative z-10">
                    <div [class]="'w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 transition-colors ' + topic.color">
                        <i [class]="topic.icon"></i>
                    </div>
                    <div>
                        <h3 class="font-bold text-[var(--text-main)] text-lg group-hover:text-[var(--color-primary)] transition-colors">{{ topic.title }}</h3>
                        <p class="text-sm text-[var(--text-muted)] mt-1">{{ topic.subtitle }}</p>
                    </div>
                </div>
                
                <div class="mt-4 flex items-center text-sm font-bold text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Leer más <i class="ri-arrow-right-line ml-1"></i>
                </div>
            </div>

        </div>
      </section>

      <section class="max-w-4xl mx-auto px-4 py-20">
         <h2 class="text-2xl font-black text-[var(--text-main)] mb-8 text-center">Preguntas Frecuentes</h2>
         <div class="space-y-4">
             <details class="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm open:border-[var(--color-primary)] transition-colors">
                <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-[var(--text-main)] list-none hover:bg-[var(--bg-input)]">
                    <span>¿Es seguro comprar aquí?</span>
                    <i class="ri-add-line text-xl group-open:rotate-45 transition-transform text-[var(--text-muted)]"></i>
                </summary>
                <div class="px-5 pb-5 pt-0 text-[var(--text-muted)] text-sm leading-relaxed border-t border-transparent group-open:border-[var(--border-color)] group-open:pt-4">
                    Totalmente. Usamos encriptación SSL de 256-bits y procesamos pagos con pasarelas certificadas. Tus datos bancarios nunca se guardan en nuestros servidores.
                </div>
             </details>

             <details class="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-sm open:border-[var(--color-primary)] transition-colors">
                <summary class="flex justify-between items-center p-5 cursor-pointer font-bold text-[var(--text-main)] list-none hover:bg-[var(--bg-input)]">
                    <span>¿Tienen tienda física?</span>
                    <i class="ri-add-line text-xl group-open:rotate-45 transition-transform text-[var(--text-muted)]"></i>
                </summary>
                <div class="px-5 pb-5 pt-0 text-[var(--text-muted)] text-sm leading-relaxed border-t border-transparent group-open:border-[var(--border-color)] group-open:pt-4">
                    Somos una tienda 100% online para ofrecerte los mejores precios, pero contamos con almacenes en Lima para entregas rápidas.
                </div>
             </details>
         </div>
      </section>

      <section class="max-w-5xl mx-auto px-4 pb-12">
        <div class="bg-[var(--text-main)] rounded-3xl p-10 text-center relative overflow-hidden shadow-2xl">
            <div class="relative z-10">
                <h2 class="text-2xl font-black text-white mb-2">¿Sigues con dudas?</h2>
                <p class="text-gray-400 mb-8">Nuestro equipo responde en minutos.</p>
                
                <div class="flex justify-center gap-4">
                    <a href="https://wa.me/51999999999" target="_blank" class="px-6 py-3 bg-[#25D366] hover:brightness-110 text-white font-bold rounded-xl transition-all shadow-lg flex items-center gap-2">
                        <i class="ri-whatsapp-line text-xl"></i> WhatsApp
                    </a>
                    <button *ngIf="!currentUser" (click)="goToLogin()" class="px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition-all flex items-center gap-2 backdrop-blur-md">
                        <i class="ri-user-line text-xl"></i> Iniciar Sesión
                    </button>
                </div>
            </div>
        </div>
      </section>

    </main>

    <div *ngIf="selectedTopic" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" (click)="closeModal()">
        
        <div class="bg-[var(--bg-card)] w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-[var(--border-color)] relative animate-slide-up" (click)="$event.stopPropagation()">
            
            <div class="sticky top-0 bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-color)] p-6 flex justify-between items-center z-10">
                <div class="flex items-center gap-4">
                    <div [class]="'w-10 h-10 rounded-xl flex items-center justify-center text-xl ' + selectedTopic.color">
                        <i [class]="selectedTopic.icon"></i>
                    </div>
                    <h3 class="text-xl font-bold text-[var(--text-main)]">{{ selectedTopic.title }}</h3>
                </div>
                <button (click)="closeModal()" class="w-8 h-8 rounded-full bg-[var(--bg-input)] hover:bg-[var(--color-error)] hover:text-white transition-colors flex items-center justify-center">
                    <i class="ri-close-line text-xl"></i>
                </button>
            </div>

            <div class="p-8 text-[var(--text-main)] leading-relaxed space-y-4" [innerHTML]="selectedTopic.content">
                </div>

            <div class="p-6 bg-[var(--bg-input)] border-t border-[var(--border-color)] text-center rounded-b-3xl">
                <p class="text-xs text-[var(--text-muted)]">¿Te sirvió esta información?</p>
            </div>

        </div>
    </div>

    <app-footer></app-footer>
  `,
    styles: [`
    .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(40px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  `]
})
export class HelpComponent implements OnInit {
    private authService = inject(AuthService);
    private router = inject(Router);

    currentUser: any = null;
    selectedTopic: HelpTopic | null = null;

    topics: HelpTopic[] = [
        {
            id: 'shipping',
            icon: 'ri-truck-line',
            color: 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400',
            title: 'Envíos y Seguimiento',
            subtitle: 'Plazos, costos y couriers',
            content: `
                <h4 class="font-bold text-lg mb-2">Tiempos de Entrega</h4>
                <ul class="list-disc pl-5 space-y-2 mb-4 text-sm text-gray-500">
                    <li><strong>Lima Metropolitana:</strong> 24 a 48 horas hábiles.</li>
                    <li><strong>Provincias:</strong> 3 a 5 días hábiles (vía Olva o Shalom).</li>
                </ul>
                <h4 class="font-bold text-lg mb-2">Costo de Envío</h4>
                <p class="text-sm text-gray-500 mb-4">El costo estándar para Lima es de <strong>S/ 15.00</strong>. Para provincias se calcula según el peso en el checkout.</p>
                <div class="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800">
                    <p class="text-sm font-bold text-blue-600 dark:text-blue-400">💡 Tip: El envío es GRATIS en compras mayores a S/ 500.</p>
                </div>
            `
        },
        {
            id: 'payments',
            icon: 'ri-bank-card-2-line',
            color: 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400',
            title: 'Pagos y Facturación',
            subtitle: 'Métodos aceptados y comprobantes',
            content: `
                <p class="mb-4 text-sm text-gray-500">Aceptamos todas las tarjetas de crédito y débito (Visa, Mastercard, Amex) y pagos mediante Yape/Plin.</p>
                <h4 class="font-bold text-lg mb-2">¿Cómo solicitar factura?</h4>
                <p class="text-sm text-gray-500 mb-4">Durante el proceso de pago (Paso 1), selecciona la opción <strong>"Solicitar Factura"</strong> e ingresa tu número de RUC. El documento XML/PDF llegará a tu correo automáticamente.</p>
            `
        },
        {
            id: 'returns',
            icon: 'ri-exchange-dollar-line',
            color: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
            title: 'Cambios y Devoluciones',
            subtitle: 'Garantía de satisfacción',
            content: `
                <h4 class="font-bold text-lg mb-2">Política de 7 días</h4>
                <p class="text-sm text-gray-500 mb-4">Si el producto no es lo que esperabas, tienes 7 días calendario para devolverlo sin costo, siempre que esté sellado y en su empaque original.</p>
                <h4 class="font-bold text-lg mb-2">Garantía por Fallo</h4>
                <p class="text-sm text-gray-500">Todos nuestros productos tecnológicos cuentan con <strong>12 meses de garantía</strong> de fábrica. Si presenta fallos, gestionamos el cambio inmediato.</p>
            `
        },
        {
            id: 'account',
            icon: 'ri-user-settings-line',
            color: 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400',
            title: 'Mi Cuenta y Seguridad',
            subtitle: 'Recuperar clave y editar perfil',
            content: `
                <p class="mb-4 text-sm text-gray-500">Para editar tus datos, ve a la sección <strong>Mi Perfil</strong> en el menú superior.</p>
                <h4 class="font-bold text-lg mb-2">Olvidé mi contraseña</h4>
                <p class="text-sm text-gray-500">En la pantalla de Login, haz clic en "¿Olvidaste tu contraseña?". Te enviaremos un código de 6 dígitos a tu correo para restablecerla de forma segura.</p>
            `
        },
        {
            id: 'coupons',
            icon: 'ri-coupon-3-line',
            color: 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400',
            title: 'Cupones y Ofertas',
            subtitle: 'Cómo aplicar descuentos',
            content: `
                <p class="mb-4 text-sm text-gray-500">Los cupones promocionales se ingresan en el <strong>Resumen del Pedido</strong> antes de pagar.</p>
                <div class="bg-gray-100 dark:bg-slate-800 p-4 rounded-xl border border-gray-200 dark:border-slate-700 font-mono text-center text-sm">
                    CUPÓN EJEMPLO: <strong>GLOBI2025</strong>
                </div>
                <p class="mt-4 text-sm text-gray-500 text-center">Suscríbete a nuestro newsletter para recibir códigos exclusivos.</p>
            `
        },
        {
            id: 'technical',
            icon: 'ri-customer-service-2-line',
            color: 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400',
            title: 'Soporte Técnico',
            subtitle: 'Ayuda con productos y web',
            content: `
                <p class="mb-4 text-sm text-gray-500">Si tienes problemas con la web o no sabes configurar un producto que compraste, nuestro equipo técnico te ayuda.</p>
                <a href="https://wa.me/51999999999" target="_blank" class="block w-full py-3 bg-green-500 text-white text-center font-bold rounded-xl hover:bg-green-600 transition-colors">
                    <i class="ri-whatsapp-line"></i> Contactar Soporte
                </a>
            `
        }
    ];

    ngOnInit() {
        this.authService.currentUser$.subscribe(u => this.currentUser = u);
    }

    goToLogin() { this.router.navigate(['/auth/login']); }

    openModal(topic: HelpTopic) {
        this.selectedTopic = topic;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.selectedTopic = null;
        document.body.style.overflow = 'auto';
    }
}