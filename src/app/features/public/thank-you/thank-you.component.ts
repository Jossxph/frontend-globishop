import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thank-you',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-4 font-sans">
      
      <div class="max-w-md w-full bg-[var(--bg-card)] rounded-3xl shadow-2xl border border-[var(--border-color)] p-8 md:p-12 text-center relative overflow-hidden animate-fade-in-up">
        
        <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[var(--color-primary)] via-blue-500 to-cyan-500"></div>

        <div class="relative mb-8">
            <div class="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mx-auto animate-pulse-slow">
                <div class="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/40 animate-scale-in">
                    <i class="ri-check-line text-4xl text-white font-bold"></i>
                </div>
            </div>
            
            <i class="ri-star-fill text-yellow-400 absolute top-0 right-[30%] text-xl animate-bounce" style="animation-delay: 0.1s"></i>
            <i class="ri-heart-fill text-red-400 absolute bottom-0 left-[30%] text-sm animate-bounce" style="animation-delay: 0.3s"></i>
            <i class="ri-checkbox-blank-circle-fill text-blue-400 absolute top-10 left-[25%] text-xs animate-bounce" style="animation-delay: 0.5s"></i>
        </div>

        <h1 class="text-3xl md:text-4xl font-black text-[var(--text-main)] mb-3 tracking-tight">
            ¡Gracias por tu compra!
        </h1>
        <p class="text-[var(--text-muted)] text-lg mb-8 leading-relaxed">
            Tu pedido ha sido procesado exitosamente. ¡Prepárate para recibirlo! 🚀
        </p>

        <div class="bg-[var(--bg-input)] rounded-2xl p-6 mb-8 border border-[var(--border-color)] border-dashed relative group hover:border-[var(--color-primary)] transition-colors">
            <p class="text-xs font-bold text-[var(--text-muted)] uppercase tracking-widest mb-1">Número de Orden</p>
            <p class="text-3xl font-black text-[var(--color-primary)] font-mono tracking-wider selection:bg-[var(--color-primary)] selection:text-white">
                #{{ orderId || 'PENDIENTE' }}
            </p>
            
            <div class="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--bg-card)] border border-[var(--border-color)] px-3 py-1 rounded-full text-[10px] font-bold text-[var(--text-muted)] shadow-sm">
                Guardado
            </div>
        </div>

        <p class="text-sm text-[var(--text-muted)] mb-8 px-4">
            Hemos enviado un correo de confirmación a tu email con los detalles de facturación y seguimiento.
        </p>

        <div class="space-y-3">
            <a routerLink="/" class="block w-full py-4 rounded-xl bg-[var(--color-primary)] text-white font-bold text-lg shadow-lg shadow-[var(--color-primary)]/30 hover:brightness-110 hover:-translate-y-1 transition-all active:scale-95 cursor-pointer">
                Seguir Comprando
            </a>
            
            <a routerLink="/profile" class="block w-full py-4 rounded-xl border-2 border-[var(--bg-input)] text-[var(--text-muted)] font-bold hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] hover:bg-[var(--bg-input)] transition-all active:scale-95 cursor-pointer">
                Ver mis Pedidos
            </a>
        </div>

      </div>
      
      <div class="absolute bottom-6 text-[var(--text-muted)] text-xs opacity-50">
        &copy; 2026 GlobiShop Secure Payment
      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    .animate-scale-in { animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
    .animate-pulse-slow { animation: pulse 3s infinite; }

    @keyframes fadeInUp { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { transform: scale(0); } to { transform: scale(1); } }
    @keyframes pulse { 0%, 100% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.1); opacity: 0.8; } }
  `]
})
export class ThankYouComponent implements OnInit {
  private route = inject(ActivatedRoute);
  orderId: string | null = null;

  ngOnInit() {
    this.orderId = this.route.snapshot.paramMap.get('id');
    if (!this.orderId) {
      this.orderId = Math.floor(100000 + Math.random() * 900000).toString();
    }
  }
}