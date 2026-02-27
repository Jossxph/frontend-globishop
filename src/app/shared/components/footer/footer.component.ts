import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="bg-card border-t border-theme pt-16 pb-8 mt-auto">
      <div class="container mx-auto px-4">
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div class="space-y-4">
            <a routerLink="/" class="flex items-center gap-2 group">
              <div class="w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-lg flex items-center justify-center text-white font-bold shadow-lg">G</div>
              <span class="text-xl font-black text-main">Globi<span class="text-primary">Shop</span></span>
            </a>
            <p class="text-muted text-sm leading-relaxed">
              Tu tienda de tecnología favorita. Acumula puntos, sube de nivel y consigue los mejores precios del mercado.
            </p>
            <div class="flex gap-4 pt-2">
              <a href="#" class="w-10 h-10 rounded-full bg-input flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"><i class="ri-facebook-fill"></i></a>
              <a href="#" class="w-10 h-10 rounded-full bg-input flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"><i class="ri-instagram-line"></i></a>
              <a href="#" class="w-10 h-10 rounded-full bg-input flex items-center justify-center text-muted hover:bg-primary hover:text-white transition-colors"><i class="ri-twitter-x-line"></i></a>
            </div>
          </div>

          <div>
            <h4 class="font-bold text-main mb-6">Compañía</h4>
            <ul class="space-y-3 text-sm text-muted">
              <li><a routerLink="/about" class="hover:text-primary transition-colors">Sobre Nosotros</a></li>
              <li><a routerLink="/work-with-us" class="hover:text-primary transition-colors flex items-center gap-2">Trabaja con nosotros <span class="text-[10px] bg-primary text-white px-1.5 rounded">Hiring</span></a></li>
              <li><a routerLink="/blog" class="hover:text-primary transition-colors">Blog de Tecnología</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-main mb-6">Ayuda & Soporte</h4>
            <ul class="space-y-3 text-sm text-muted">
              <li><a routerLink="/help" class="hover:text-primary transition-colors">Centro de Ayuda</a></li>
              <li><a routerLink="/shipping-info" class="hover:text-primary transition-colors">Envíos y Entregas</a></li>
              <li><a routerLink="/returns" class="hover:text-primary transition-colors">Devoluciones</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold text-main mb-6">Legal</h4>
            <ul class="space-y-3 text-sm text-muted">
              <li><a routerLink="/legal/terms" class="hover:text-primary transition-colors">Términos y Condiciones</a></li>
              <li><a routerLink="/legal/privacy" class="hover:text-primary transition-colors">Política de Privacidad</a></li>
              <li><a routerLink="/legal/promotions" class="hover:text-primary transition-colors">Bases de Promociones</a></li>
              <li><a routerLink="/legal/accessibility" class="hover:text-primary transition-colors">Accesibilidad</a></li>
            </ul>
          </div>

        </div>

        <div class="border-t border-theme pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-xs text-muted">© 2025 GlobiShop S.A.C. Todos los derechos reservados.</p>
          <div class="flex gap-6">
            <i class="ri-visa-line text-2xl text-muted"></i>
            <i class="ri-mastercard-line text-2xl text-muted"></i>
            <i class="ri-paypal-line text-2xl text-muted"></i>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent { }