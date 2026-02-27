import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

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
    imports: [CommonModule],
    templateUrl: './help.html',
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