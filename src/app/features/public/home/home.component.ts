import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { FadeOnScrollDirective } from '../../../shared/directives/fade-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, RouterLink, FadeOnScrollDirective],
  template: `
    <app-navbar></app-navbar>
    
    <main class="min-h-screen bg-main pt-24 md:pt-32">
      
<section class="relative h-[600px] md:h-[700px] w-full overflow-hidden mb-12 group">
        
        <div *ngFor="let slide of heroSlides; let i = index"
             class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
             [class.opacity-100]="i === currentSlide"
             [class.opacity-0]="i !== currentSlide">
            
             <img [src]="slide.image" class="w-full h-full object-cover animate-slow-zoom">
             
             <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/60 to-transparent"></div>
        </div>

        <div class="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
            
            <div class="max-w-2xl transition-all duration-700 transform"
                 [ngClass]="isAnimating ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'">
                
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/30 backdrop-blur-md mb-6">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span class="text-primary text-xs font-bold tracking-widest uppercase">{{ heroSlides[currentSlide].badge }}</span>
                </div>

                <h1 class="text-5xl md:text-7xl font-black text-white leading-tight mb-4 drop-shadow-2xl">
                    {{ heroSlides[currentSlide].title }}
                    <br>
                    <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        {{ heroSlides[currentSlide].highlight }}
                    </span>
                </h1>

                <p class="text-slate-300 text-lg md:text-xl mb-8 max-w-lg leading-relaxed border-l-4 border-primary pl-4">
                    {{ heroSlides[currentSlide].description }}
                </p>

                <div class="flex flex-col sm:flex-row gap-4">
                    <a routerLink="/products" class="px-8 py-4 bg-primary hover:bg-secondary text-white font-bold rounded-xl shadow-lg shadow-primary/25 hover:-translate-y-1 transition-all flex items-center justify-center gap-2">
                        <i class="ri-shopping-bag-3-line"></i> Comprar Ahora
                    </a>
                    <a routerLink="/products" class="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl border border-white/10 backdrop-blur-sm transition-all flex items-center justify-center gap-2">
                        Ver Colección
                    </a>
                </div>
            </div>
        </div>

        <div class="absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-3">
            <button *ngFor="let slide of heroSlides; let i = index" 
                    (click)="setSlide(i)"
                    class="group relative h-1 transition-all duration-300"
                    [class.w-12]="i === currentSlide"
                    [class.w-4]="i !== currentSlide">
                <div class="absolute inset-0 bg-white/20 rounded-full"></div>
                <div [class.w-full]="i === currentSlide" 
                     [class.w-0]="i !== currentSlide"
                     class="absolute inset-0 bg-primary rounded-full transition-all duration-300"></div>
            </button>
        </div>

        <button (click)="nextSlide()" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-white/10 bg-black/20 hover:bg-primary text-white backdrop-blur-sm flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 z-20">
             <i class="ri-arrow-right-s-line text-2xl"></i>
        </button>

      </section>

      <section appFadeOnScroll class="py-12 border-b border-theme bg-card mb-12 relative group/section">
        <div class="container mx-auto px-4 relative">
            <h3 class="text-sm font-bold text-muted uppercase tracking-widest mb-8 flex items-center gap-2">
                <i class="ri-layout-masonry-line text-primary"></i> Explora por Categorías
            </h3>
            
            <div *ngIf="isLoading" class="flex gap-6 overflow-hidden pb-4">
                <div *ngFor="let i of [1,2,3,4,5,6]" class="shrink-0 w-32 md:w-40 flex flex-col items-center gap-3 animate-pulse">
                    <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 dark:bg-slate-800"></div>
                    <div class="h-4 w-20 bg-gray-200 dark:bg-slate-800 rounded"></div>
                </div>
            </div>

            <div *ngIf="!isLoading && categories.length > 0" class="relative animate-fade-in">
                
                <button (click)="scrollCategories(-300)" class="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 w-10 h-10 bg-card border border-theme rounded-full shadow-lg flex items-center justify-center text-main hover:bg-primary hover:text-white transition-all opacity-0 group-hover/section:opacity-100">
                    <i class="ri-arrow-left-s-line text-xl"></i>
                </button>

                <div #categoryContainer class="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x scroll-smooth">
                    <a *ngFor="let cat of categories" 
                       routerLink="/products" 
                       [queryParams]="{ category: cat.nombre }"
                       class="snap-start shrink-0 w-32 md:w-40 flex flex-col items-center gap-3 group cursor-pointer hover:scale-105 transition-transform duration-300">
                        
                        <div class="w-20 h-20 md:w-24 md:h-24 rounded-full bg-input border border-theme flex items-center justify-center text-3xl text-muted group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all shadow-sm group-hover:shadow-lg">
                            <i [class]="getIconForCategory(cat.nombre)"></i>
                        </div>
                        
                        <span class="text-sm font-bold text-main group-hover:text-primary transition-colors capitalize text-center leading-tight px-2">
                            {{ cat.nombre }}
                        </span>
                    </a>
                </div>

                <button (click)="scrollCategories(300)" class="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 w-10 h-10 bg-card border border-theme rounded-full shadow-lg flex items-center justify-center text-main hover:bg-primary hover:text-white transition-all opacity-0 group-hover/section:opacity-100">
                    <i class="ri-arrow-right-s-line text-xl"></i>
                </button>
            </div>
        </div>
      </section>

      <section appFadeOnScroll class="py-12 container mx-auto px-4 mb-12">
         <div class="flex justify-between items-end mb-8">
            <div>
                <h2 class="text-3xl font-black text-main">Recién Llegados 🔥</h2>
                <p class="text-muted">Lo último en tecnología aterriza aquí.</p>
            </div>
            <a routerLink="/products" class="text-primary font-bold hover:underline hidden md:block">Ver todo</a>
         </div>

         <div *ngIf="isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             <div *ngFor="let i of [1,2,3,4]" class="bg-card border border-theme rounded-2xl p-4 animate-pulse">
                 <div class="h-48 bg-gray-200 dark:bg-slate-800 rounded-xl mb-4"></div>
                 <div class="h-4 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mb-2"></div>
                 <div class="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4 mb-4"></div>
                 <div class="h-10 bg-gray-200 dark:bg-slate-800 rounded-lg"></div>
             </div>
         </div>

         <div *ngIf="!isLoading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            <div *ngFor="let product of newProducts" class="group bg-card border border-theme rounded-2xl p-4 hover:shadow-xl hover:-translate-y-1 transition-all">
                
                <div class="relative h-48 bg-white rounded-xl mb-4 flex items-center justify-center p-4 overflow-hidden">
                    <span class="absolute top-2 left-2 bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-md">NUEVO</span>
                    
                    <img [src]="product.imagenUrl || 'assets/images/no-image.png'" 
                         (error)="handleImageError($event)"
                         [alt]="product.nombre"
                         class="max-h-full object-contain group-hover:scale-110 transition-transform duration-500">
                         
                    <div class="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                </div>

                <h3 class="font-bold text-main truncate" [title]="product.nombre">{{ product.nombre }}</h3>
                <p class="text-primary font-black mt-1 text-lg">S/ {{ product.precio | number:'1.2-2' }}</p>
                
                <a [routerLink]="['/products', product.id]" class="mt-4 block w-full py-2.5 bg-input hover:bg-primary hover:text-white text-main text-center rounded-xl text-sm font-bold transition-all border border-transparent hover:shadow-lg hover:shadow-primary/20">
                    Ver Detalles
                </a>
            </div>
         </div>
      </section>

      <section class="py-20 bg-slate-900 text-center px-4 relative overflow-hidden mb-12 rounded-none md:rounded-3xl md:mx-4 shadow-2xl">
         <div class="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
         <div class="absolute -top-24 -left-24 w-64 h-64 bg-primary rounded-full blur-3xl opacity-20"></div>
         <div class="absolute -bottom-24 -right-24 w-64 h-64 bg-secondary rounded-full blur-3xl opacity-20"></div>

         <div class="relative z-10">
             <h2 class="text-3xl md:text-5xl font-black text-white mb-4 drop-shadow-lg">¿Necesitas Ayuda?</h2>
             <p class="text-slate-300 mb-8">Nuestro equipo de expertos está listo para asesorarte.</p>
             <a routerLink="/help" class="inline-flex items-center gap-2 px-8 py-3 bg-white text-slate-900 font-bold rounded-xl shadow-lg hover:scale-105 transition-transform hover:bg-gray-100">
                <i class="ri-customer-service-2-line"></i> Ir al Centro de Ayuda
             </a>
         </div>
      </section>

    </main>
    <app-footer></app-footer>
  `,
  styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .animate-pulse-slow { animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    
    .animate-slow-zoom { animation: slowZoom 20s linear infinite alternate; }
    @keyframes slowZoom {
        from { transform: scale(1); }
        to { transform: scale(1.15); }
    }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
`]
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('categoryContainer') categoryContainer!: ElementRef;

  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);

  isLoading = true;

  currentSlide = 0;
  isAnimating = false;
  intervalId: any;
  heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop',
      badge: 'NUEVA ERA',
      title: 'Setup Gamer 2025',
      highlight: 'Potencia Pura',
      description: 'Eleva tu nivel con la última generación de procesadores y gráficas RTX.'
    },
    {
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
      badge: 'PRODUCTIVIDAD',
      title: 'Espacios que Inspiran',
      highlight: 'Workflow Perfecto',
      description: 'Monitores ultrawide, teclados mecánicos y todo para tu home office.'
    },
    {
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
      badge: 'TENDENCIA',
      title: 'Wearables Smart',
      highlight: 'Conecta tu Vida',
      description: 'Relojes inteligentes y audífonos con cancelación de ruido de otro nivel.'
    },
    {
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2068&auto=format&fit=crop',
      badge: 'PORTABILIDAD',
      title: 'Laptops Ultraligeras',
      highlight: 'Poder sin Límites',
      description: 'Lleva tu creatividad a cualquier parte con batería para todo el día.'
    }
  ];


  categories: any[] = [];
  newProducts: any[] = [];

  ngOnInit() {
    this.startCarousel();
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    forkJoin({
      products: this.productService.getProducts(),
      categories: this.categoryService.getCategories()
    }).subscribe({
      next: (res: any) => {
        this.newProducts = res.products.slice(-4).reverse();
        this.categories = res.categories.filter((c: any) => c.activo === 1 || c.activo === true);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error cargando datos:', err);
        this.isLoading = false;
        this.categories = [{ nombre: 'Laptops' }, { nombre: 'Gamer' }];
      }
    });
  }

  ngOnDestroy() { if (this.intervalId) clearInterval(this.intervalId); }

  scrollCategories(amount: number) {
    this.categoryContainer.nativeElement.scrollBy({ left: amount, behavior: 'smooth' });
  }

  handleImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/300x300?text=GlobiShop';
  }

  getIconForCategory(dbName: string): string {
    const name = dbName.toLowerCase();
    if (name.includes('tecnología') || name.includes('tech') || name.includes('laptop')) return 'ri-macbook-line';
    if (name.includes('ropa') || name.includes('moda')) return 'ri-t-shirt-air-line';
    if (name.includes('hogar')) return 'ri-home-wifi-line';
    if (name.includes('gamer') || name.includes('juego')) return 'ri-gamepad-line';
    if (name.includes('dev') || name.includes('soft')) return 'ri-code-s-slash-line';
    if (name.includes('monitor')) return 'ri-computer-line';
    if (name.includes('oficina')) return 'ri-briefcase-4-line';
    if (name.includes('mascota')) return 'ri-bear-smile-line';
    if (name.includes('salud') || name.includes('fitness')) return 'ri-heart-pulse-line';
    if (name.includes('belleza')) return 'ri-sparkling-line';
    if (name.includes('automotriz')) return 'ri-roadster-line';
    return 'ri-price-tag-3-line';
  }

  startCarousel() { this.intervalId = setInterval(() => { this.nextSlide(); }, 5000); }
  nextSlide() {
    this.isAnimating = true;
    setTimeout(() => {
      this.currentSlide = (this.currentSlide + 1) % this.heroSlides.length;
      this.isAnimating = false;
    }, 500);
  }
  setSlide(index: number) {
    this.isAnimating = true;
    setTimeout(() => {
      this.currentSlide = index;
      this.isAnimating = false;
      clearInterval(this.intervalId);
      this.startCarousel();
    }, 300);
  }
}