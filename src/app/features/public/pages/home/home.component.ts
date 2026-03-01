import { Component, inject, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../product/services/product.service';
import { CategoryService } from '../../../product/services/category.service';
import { FadeOnScrollDirective } from '../../../../shared/directives/fade-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, FadeOnScrollDirective],
  templateUrl: './home.html',
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
    event.target.src = 'https://placehold.co/300x300?text=GlobiShop';
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