import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="relative w-full min-h-[600px] flex items-center justify-center overflow-hidden bg-main">
      
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse-slow [animation-delay:1s]"></div>

      <div class="container mx-auto px-4 relative z-10 text-center">
        
        <div class="inline-block mb-6 animate-fade-in-down">
          <span class="py-1.5 px-4 rounded-full bg-input border border-theme text-xs font-bold text-primary uppercase tracking-wider shadow-sm">
            🚀 Nueva Colección 2025
          </span>
        </div>

        <h1 class="text-5xl md:text-7xl font-black text-main tracking-tight mb-6 leading-tight animate-fade-in-up">
          Tecnología que <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Define tu Futuro</span>
        </h1>

        <p class="text-lg md:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up [animation-delay:0.2s]">
          Equípate con los mejores gadgets. Compra, acumula XP y desbloquea 
          descuentos exclusivos en tu cuenta GlobiShop Nivel Oro.
        </p>

        <div class="flex flex-col md:flex-row gap-4 justify-center animate-fade-in-up [animation-delay:0.4s]">
          <a routerLink="/products" class="px-8 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
            Ver Catálogo <i class="ri-arrow-right-line"></i>
          </a>
          <a routerLink="/products" [queryParams]="{sort: 'best_selling'}" class="px-8 py-4 bg-card border border-theme text-main font-bold rounded-xl hover:bg-input transition-all flex items-center justify-center gap-2">
            <i class="ri-fire-line text-orange-500"></i> Más Vendidos
          </a>
        </div>

      </div>
    </section>
  `,
  styles: [`
    .animate-pulse-slow { animation: pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.5; } }
  `]
})
export class HeroComponent { }