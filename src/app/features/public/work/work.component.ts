import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

interface JobOffer {
    id: number;
    title: string;
    department: string;
    location: string;
    type: string;
    icon: string;
    colorClass: string;
    borderColorClass: string;
    description: string;
    responsibilities: string[];
    requirements: string[];
}

@Component({
    selector: 'app-work',
    standalone: true,
    imports: [CommonModule, PageHeaderComponent],
    template: `
    <app-page-layout 
        title="Únete al Equipo" 
        subtitle="Careers"
        bgImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80">

        <div class="max-w-5xl mx-auto space-y-24">
            
            <div class="text-center max-w-3xl mx-auto">
                <h2 class="text-3xl font-black text-main mb-6">Construye el futuro del e-commerce</h2>
                <p class="text-muted text-lg leading-relaxed">
                    En GlobiShop no solo vendemos tecnología, la vivimos. Buscamos personas obsesionadas con la experiencia de usuario.
                </p>
            </div>

            <div class="grid md:grid-cols-3 gap-8">
                <div class="bg-card border border-theme p-8 rounded-3xl hover:border-primary transition-colors group">
                    <div class="w-14 h-14 bg-primary/10 text-primary rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        <i class="ri-macbook-line"></i>
                    </div>
                    <h3 class="font-bold text-main text-xl mb-3">Tu Setup, Tus Reglas</h3>
                    <p class="text-sm text-muted">Te damos presupuesto para que armes tu estación de trabajo y silla ergonómica.</p>
                </div>
                <div class="bg-card border border-theme p-8 rounded-3xl hover:border-primary transition-colors group">
                    <div class="w-14 h-14 bg-green-500/10 text-green-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        <i class="ri-home-wifi-line"></i>
                    </div>
                    <h3 class="font-bold text-main text-xl mb-3">Remoto First</h3>
                    <p class="text-sm text-muted">Trabaja desde donde seas más feliz. Oficinas en Lima opcionales.</p>
                </div>
                <div class="bg-card border border-theme p-8 rounded-3xl hover:border-primary transition-colors group">
                    <div class="w-14 h-14 bg-purple-500/10 text-purple-500 rounded-2xl flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform">
                        <i class="ri-heart-pulse-line"></i>
                    </div>
                    <h3 class="font-bold text-main text-xl mb-3">Salud y Bienestar</h3>
                    <p class="text-sm text-muted">Seguro EPS cubierto al 100% y días libres por salud mental.</p>
                </div>
            </div>

            <div>
                <h3 class="text-2xl font-black text-main mb-8 border-l-4 border-primary pl-4">Posiciones Abiertas</h3>
                
                <div class="space-y-4">
                    <div *ngFor="let job of jobs" 
                         (click)="openModal(job)"
                         class="group bg-card border border-theme p-6 rounded-2xl transition-all shadow-sm hover:shadow-md flex flex-col md:flex-row justify-between items-center gap-4 cursor-pointer hover:border-[colorClass]">
                        
                        <div class="flex items-center gap-5 w-full">
                            <div [ngClass]="job.colorClass" class="hidden md:flex w-16 h-16 rounded-2xl bg-input items-center justify-center text-2xl font-bold transition-colors group-hover:bg-opacity-20">
                                <i [class]="job.icon"></i>
                            </div>
                            <div>
                                <h4 class="font-bold text-main text-xl group-hover:text-primary transition-colors">{{ job.title }}</h4>
                                <div class="flex flex-wrap gap-3 mt-2 text-xs font-bold uppercase tracking-wider text-muted">
                                    <span class="bg-input px-2 py-1 rounded border border-theme">{{ job.department }}</span>
                                    <span class="bg-input px-2 py-1 rounded border border-theme flex items-center gap-1"><i class="ri-map-pin-line"></i> {{ job.location }}</span>
                                    <span [ngClass]="job.colorClass">{{ job.type }}</span>
                                </div>
                            </div>
                        </div>
                        <button class="w-full md:w-auto px-6 py-3 rounded-xl border border-theme text-main font-bold hover:bg-input transition-all text-sm shrink-0">
                            Ver Detalles
                        </button>
                    </div>
                </div>
            </div>

            <div class="bg-input/50 border border-dashed border-theme rounded-3xl p-10 text-center">
                <h3 class="text-2xl font-bold text-main mb-3">¿No ves tu puesto ideal?</h3>
                <p class="text-muted mb-8 max-w-xl mx-auto">Siempre buscamos talento. Envíanos tu CV.</p>
                <a href="mailto:talent@globishop.com" class="inline-flex items-center gap-2 px-8 py-3 bg-main border border-theme hover:border-primary text-main font-bold rounded-xl transition-all shadow-sm hover:-translate-y-1">
                    <i class="ri-mail-send-line text-primary"></i> Enviar Candidatura
                </a>
            </div>
        </div>

        <div *ngIf="selectedJob" class="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            
            <div (click)="closeModal()" class="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer"></div>

            <div class="relative bg-card w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-theme flex flex-col animate-slide-up">
                
                <div class="sticky top-0 bg-card/95 backdrop-blur z-10 border-b border-theme p-6 flex justify-between items-start">
                    <div>
                        <h2 class="text-2xl font-black text-main leading-tight">{{ selectedJob.title }}</h2>
                        <div class="flex gap-3 text-sm text-muted mt-2">
                            <span>{{ selectedJob.department }}</span> • <span>{{ selectedJob.location }}</span>
                        </div>
                    </div>
                    <button (click)="closeModal()" class="w-10 h-10 rounded-full bg-input hover:bg-red-100 hover:text-red-500 transition-colors flex items-center justify-center text-muted">
                        <i class="ri-close-line text-xl"></i>
                    </button>
                </div>

                <div class="p-8 space-y-8">
                    
                    <div>
                        <h4 class="font-bold text-main mb-3 text-lg">Sobre el Rol</h4>
                        <p class="text-muted leading-relaxed">{{ selectedJob.description }}</p>
                    </div>

                    <div>
                        <h4 class="font-bold text-main mb-3 text-lg">Tus Retos</h4>
                        <ul class="space-y-3">
                            <li *ngFor="let item of selectedJob.responsibilities" class="flex items-start gap-3 text-muted">
                                <i class="ri-checkbox-circle-line text-primary mt-1"></i>
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 class="font-bold text-main mb-3 text-lg">Lo que buscamos</h4>
                        <ul class="space-y-3">
                            <li *ngFor="let item of selectedJob.requirements" class="flex items-start gap-3 text-muted">
                                <i class="ri-check-line text-green-500 mt-1"></i>
                                <span>{{ item }}</span>
                            </li>
                        </ul>
                    </div>

                </div>

                <div class="sticky bottom-0 bg-card border-t border-theme p-6 flex justify-end gap-4">
                    <button (click)="closeModal()" class="px-6 py-3 rounded-xl font-bold text-muted hover:text-main transition-colors">
                        Cancelar
                    </button>
                    <a href="mailto:jobs@globishop.com?subject=Aplicación para {{selectedJob.title}}" 
                       class="px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all flex items-center gap-2">
                        Aplicar ahora <i class="ri-arrow-right-line"></i>
                    </a>
                </div>

            </div>
        </div>

    </app-page-layout>
  `,
    styles: [`
    .animate-slide-up { animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
    @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.95); } to { opacity: 1; transform: translateY(0) scale(1); } }
  `]
})
export class WorkComponent {

    selectedJob: JobOffer | null = null;

    jobs: JobOffer[] = [
        {
            id: 1,
            title: 'Senior Frontend Developer',
            department: 'Ingeniería',
            location: 'Remoto',
            type: 'Full Time',
            icon: 'ri-code-s-slash-line',
            colorClass: 'text-primary',
            borderColorClass: 'hover:border-primary',
            description: 'Estamos buscando un arquitecto de interfaces apasionado por Angular y el rendimiento web. Liderarás la migración de nuestra plataforma a micro-frontends y establecerás el sistema de diseño.',
            responsibilities: [
                'Desarrollar nuevas features críticas para el checkout y perfil de usuario.',
                'Optimizar Core Web Vitals y reducir el tiempo de carga.',
                'Mentorear a desarrolladores junior y realizar code reviews rigurosos.'
            ],
            requirements: [
                '5+ años de experiencia con Angular (v14+).',
                'Dominio de RxJS, Signals y State Management.',
                'Experiencia con Tailwind CSS y diseño responsivo.',
                'Inglés técnico intermedio/avanzado.'
            ]
        },
        {
            id: 2,
            title: 'Product Designer (UX/UI)',
            department: 'Diseño',
            location: 'Híbrido (Lima)',
            type: 'Full Time',
            icon: 'ri-palette-line',
            colorClass: 'text-purple-500',
            borderColorClass: 'hover:border-purple-500',
            description: 'Buscamos alguien que traduzca problemas complejos en interfaces simples y hermosas. Trabajarás mano a mano con los PMs para definir el futuro de la experiencia de compra en GlobiShop.',
            responsibilities: [
                'Diseñar flujos de usuario completos en Figma.',
                'Mantener y evolucionar nuestro Design System.',
                'Realizar pruebas de usabilidad con usuarios reales.'
            ],
            requirements: [
                'Portafolio demostrable de proyectos e-commerce o SaaS.',
                'Dominio experto de Figma y Auto Layout.',
                'Entendimiento básico de HTML/CSS (saber qué es posible construir).'
            ]
        },
        {
            id: 3,
            title: 'Backend Java Developer',
            department: 'Ingeniería',
            location: 'Remoto',
            type: 'Full Time',
            icon: 'ri-server-line',
            colorClass: 'text-orange-500',
            borderColorClass: 'hover:border-orange-500',
            description: 'El motor de GlobiShop necesita potencia. Buscamos un experto en Java y Spring Boot para escalar nuestra API de miles a millones de peticiones diarias.',
            responsibilities: [
                'Diseñar microservicios escalables con Spring Boot 3.',
                'Optimizar consultas SQL complejas y gestionar caché con Redis.',
                'Integrar pasarelas de pago y proveedores logísticos.'
            ],
            requirements: [
                'Experiencia sólida en Java 17/21 y Spring Ecosystem.',
                'Conocimientos de Docker, Kubernetes y CI/CD.',
                'Experiencia con bases de datos relacionales (PostgreSQL/SQL Server).'
            ]
        }
    ];

    openModal(job: JobOffer) {
        this.selectedJob = job;
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.selectedJob = null;
        document.body.style.overflow = 'auto';
    }
}