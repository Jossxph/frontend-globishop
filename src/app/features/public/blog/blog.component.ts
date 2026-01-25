import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-layout 
        title="Blog & Noticias" 
        subtitle="The GlobiShop Daily"
        bgImage="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80">

        <div class="max-w-6xl mx-auto space-y-16">
            
            <div class="flex flex-wrap justify-center gap-3">
                <button class="px-5 py-2 rounded-full bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30">Todo</button>
                <button class="px-5 py-2 rounded-full bg-card border border-theme text-muted font-medium text-sm hover:border-primary hover:text-primary transition-colors">Hardware</button>
                <button class="px-5 py-2 rounded-full bg-card border border-theme text-muted font-medium text-sm hover:border-primary hover:text-primary transition-colors">Tutoriales</button>
                <button class="px-5 py-2 rounded-full bg-card border border-theme text-muted font-medium text-sm hover:border-primary hover:text-primary transition-colors">Reviews</button>
            </div>

            <article class="relative group rounded-3xl overflow-hidden cursor-pointer h-[500px]">
                <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80" class="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                
                <div class="absolute bottom-0 left-0 p-8 md:p-12 max-w-3xl">
                    <span class="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-4">EDITOR'S CHOICE</span>
                    <h2 class="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors">
                        Guía Definitiva 2025: Cómo armar la PC Gamer perfecta por menos de S/ 3000
                    </h2>
                    <p class="text-slate-300 text-lg line-clamp-2 mb-6 hidden md:block">
                        Analizamos cada componente para exprimir hasta el último FPS sin romper la alcancía. Procesadores, gráficas y trucos de ensamblaje.
                    </p>
                    <div class="flex items-center gap-4 text-sm text-slate-400 font-bold uppercase tracking-wider">
                        <span><i class="ri-user-line"></i> Por Team Globi</span>
                        <span>•</span>
                        <span>15 Dic, 2025</span>
                    </div>
                </div>
            </article>

            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                <article class="bg-card border border-theme rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer h-full flex flex-col">
                    <div class="h-60 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <span class="absolute top-4 left-4 bg-purple-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">RETRO</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="font-bold text-main text-xl mb-3 leading-snug group-hover:text-purple-500 transition-colors">
                            ¿Por qué vuelven los teclados mecánicos viejos?
                        </h3>
                        <p class="text-sm text-muted line-clamp-3 mb-6 flex-1">
                            La nostalgia vende, pero la calidad del switch IBM Model M es eterna. Analizamos el mercado retro.
                        </p>
                        <div class="flex items-center justify-between pt-4 border-t border-theme text-xs text-muted font-bold uppercase">
                            <span>10 Dic</span>
                            <span>3 min lectura</span>
                        </div>
                    </div>
                </article>

                <article class="bg-card border border-theme rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer h-full flex flex-col">
                    <div class="h-60 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1624705002806-5d72df19c3ad?q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <span class="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">TUTORIAL</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="font-bold text-main text-xl mb-3 leading-snug group-hover:text-green-500 transition-colors">
                            Gestión de Cables: Nivel Dios
                        </h3>
                        <p class="text-sm text-muted line-clamp-3 mb-6 flex-1">
                            Haz que tu setup se vea limpio por delante y por detrás. Trucos con precintos y velcros.
                        </p>
                        <div class="flex items-center justify-between pt-4 border-t border-theme text-xs text-muted font-bold uppercase">
                            <span>05 Dic</span>
                            <span>10 min lectura</span>
                        </div>
                    </div>
                </article>

                <article class="bg-card border border-theme rounded-3xl overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer h-full flex flex-col">
                    <div class="h-60 relative overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?q=80" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
                        <span class="absolute top-4 left-4 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg">NEWS</span>
                    </div>
                    <div class="p-6 flex flex-col flex-1">
                        <h3 class="font-bold text-main text-xl mb-3 leading-snug group-hover:text-blue-500 transition-colors">
                            Intel vs AMD: La batalla de 2025
                        </h3>
                        <p class="text-sm text-muted line-clamp-3 mb-6 flex-1">
                            Benchmarks filtrados de la nueva generación. ¿Quién se lleva la corona en rendimiento gaming?
                        </p>
                        <div class="flex items-center justify-between pt-4 border-t border-theme text-xs text-muted font-bold uppercase">
                            <span>02 Dic</span>
                            <span>8 min lectura</span>
                        </div>
                    </div>
                </article>
            </div>

            <div class="bg-slate-900 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
                <div class="absolute top-0 right-0 w-64 h-64 bg-primary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
                <div class="absolute bottom-0 left-0 w-64 h-64 bg-secondary rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>

                <div class="relative z-10 max-w-2xl mx-auto">
                    <h3 class="text-3xl font-black text-white mb-4">No te pierdas ninguna novedad</h3>
                    <p class="text-slate-400 mb-8">Únete a nuestra newsletter semanal. Solo contenido de valor, nada de spam. Prometido.</p>
                    
                    <div class="flex flex-col sm:flex-row gap-3">
                        <input type="email" placeholder="tu@correo.com" class="flex-1 px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:border-primary transition-colors">
                        <button class="px-8 py-3 bg-primary hover:bg-secondary text-white font-bold rounded-xl transition-all shadow-lg shadow-primary/30">
                            Suscribirme
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </app-page-layout>
  `
})
export class BlogComponent { }