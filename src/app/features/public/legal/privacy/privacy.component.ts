import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-layout 
        title="Política de Privacidad" 
        subtitle="Protección de Datos"
        bgImage="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80">

        <div class="max-w-4xl mx-auto bg-card border border-theme rounded-3xl p-10 md:p-16 shadow-sm">
            
            <div class="space-y-12 text-muted leading-relaxed">

                <div>
                    <h2 class="text-3xl font-black text-main mb-6">Tu privacidad es sagrada</h2>
                    <p class="text-lg">
                        En GlobiShop no vendemos tus datos. Punto. Esta política describe qué información recolectamos y cómo la usamos exclusivamente para mejorar tu experiencia de compra.
                    </p>
                </div>

                <div class="grid md:grid-cols-2 gap-8">
                    <div class="bg-input p-6 rounded-2xl border border-theme">
                        <i class="ri-database-2-line text-3xl text-primary mb-4"></i>
                        <h4 class="font-bold text-main mb-2">Qué recolectamos</h4>
                        <ul class="text-sm space-y-2">
                            <li>• Datos de identificación (Nombre, DNI).</li>
                            <li>• Datos de contacto (Email, Teléfono).</li>
                            <li>• Dirección de entrega.</li>
                        </ul>
                    </div>
                    <div class="bg-input p-6 rounded-2xl border border-theme">
                        <i class="ri-shield-keyhole-line text-3xl text-primary mb-4"></i>
                        <h4 class="font-bold text-main mb-2">Cómo la protegemos</h4>
                        <ul class="text-sm space-y-2">
                            <li>• Encriptación SSL de 256-bits.</li>
                            <li>• Pasarelas de pago tokenizadas (no guardamos tarjetas).</li>
                            <li>• Acceso restringido a personal autorizado.</li>
                        </ul>
                    </div>
                </div>

                <section>
                    <h3 class="text-xl font-bold text-main mb-4">Derechos ARCO</h3>
                    <p class="mb-4">
                        Conforme a la Ley de Protección de Datos Personales, tienes derecho a Acceder, Rectificar, Cancelar u Oponerte al tratamiento de tus datos.
                    </p>
                    <p>
                        Para ejercer estos derechos, envía una solicitud a <span class="text-primary font-bold">privacidad@globishop.com</span> y te responderemos en un plazo máximo de 72 horas.
                    </p>
                </section>

                <section>
                    <h3 class="text-xl font-bold text-main mb-4">Cookies</h3>
                    <p>
                        Usamos cookies esenciales para mantener tu sesión activa y recordar tu carrito de compras. No usamos cookies de rastreo invasivo de terceros.
                    </p>
                </section>

            </div>
        </div>

    </app-page-layout>
  `
})
export class PrivacyComponent { }