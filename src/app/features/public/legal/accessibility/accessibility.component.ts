import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-accessibility',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-layout 
        title="Declaración de Accesibilidad" 
        subtitle="Inclusión Digital"
        bgImage="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80">

        <div class="max-w-4xl mx-auto bg-card border border-theme rounded-3xl p-10 md:p-16 shadow-sm">
            
            <div class="space-y-8 text-muted leading-relaxed">
                
                <p class="text-lg">
                    GlobiShop se compromete a garantizar la accesibilidad digital para personas con discapacidad. Estamos mejorando continuamente la experiencia del usuario para todos y aplicando los estándares de accesibilidad pertinentes.
                </p>

                <div class="grid md:grid-cols-2 gap-6 my-8">
                    <div class="flex gap-4 items-start">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><i class="ri-eye-line"></i></div>
                        <div>
                            <h4 class="font-bold text-main">Contraste Alto</h4>
                            <p class="text-sm">Diseñamos nuestro modo oscuro y claro verificando los ratios de contraste WCAG.</p>
                        </div>
                    </div>
                    <div class="flex gap-4 items-start">
                        <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0"><i class="ri-keyboard-line"></i></div>
                        <div>
                            <h4 class="font-bold text-main">Navegación por Teclado</h4>
                            <p class="text-sm">Todo el sitio es navegable usando Tab y Enter sin necesidad de mouse.</p>
                        </div>
                    </div>
                </div>

                <section>
                    <h3 class="text-xl font-bold text-main mb-2">Estado de conformidad</h3>
                    <p>
                        Las Pautas de Accesibilidad al Contenido Web (WCAG) definen los requisitos para los diseñadores y desarrolladores para mejorar la accesibilidad para las personas con discapacidad. GlobiShop apunta a cumplir con el <strong>Nivel AA</strong>.
                    </p>
                </section>

                <section>
                    <h3 class="text-xl font-bold text-main mb-2">Feedback</h3>
                    <p>
                        Agradecemos tus comentarios sobre la accesibilidad de GlobiShop. Por favor, avísanos si encuentras barreras de accesibilidad:
                    </p>
                    <a href="mailto:accesibilidad@globishop.com" class="inline-block mt-4 text-primary font-bold hover:underline">accesibilidad@globishop.com</a>
                </section>

            </div>
        </div>

    </app-page-layout>
  `
})
export class AccessibilityComponent { }