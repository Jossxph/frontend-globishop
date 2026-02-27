import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

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
    templateUrl: './work.html',
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