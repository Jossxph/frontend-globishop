import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-page-layout',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>

    <div class="relative w-full h-[400px] flex items-center justify-center overflow-hidden bg-slate-900 pt-16">
        
        <div class="absolute inset-0 z-0">
             <img [src]="bgImage" class="w-full h-full object-cover opacity-40 animate-scale-slow">
        </div>

        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 z-10"></div>
        
        <div class="relative z-20 text-center px-4 mt-10">
            <span *ngIf="subtitle" class="inline-block py-1 px-3 rounded-full bg-primary/20 border border-primary/50 text-primary font-bold text-xs uppercase tracking-widest backdrop-blur-sm mb-4">
                {{ subtitle }}
            </span>
            <h1 class="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-lg mb-6">
                {{ title }}
            </h1>
        </div>
    </div>

    <div class="relative z-30 container mx-auto px-4 py-16 -mt-16 animate-fade-in">
        <ng-content></ng-content> </div>

    <app-footer></app-footer>
  `,
  styles: [`
    .animate-scale-slow { animation: scaleSlow 20s infinite alternate; }
    @keyframes scaleSlow { from { transform: scale(1); } to { transform: scale(1.1); } }
  `]
})
export class PageHeaderComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() bgImage: string = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa';
}