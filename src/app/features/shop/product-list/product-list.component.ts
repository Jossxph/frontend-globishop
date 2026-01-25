import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../core/services/product.service';
import { CategoryService } from '../../../core/services/category.service';
import { CartService } from '../../../core/services/cart.service';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../../shared/components/footer/footer.component';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, NavbarComponent, FooterComponent],
  template: `
    <app-navbar></app-navbar>
    
    <div class="min-h-screen bg-main pt-32 pb-12 animate-fade-in">
        
        <div class="container mx-auto px-4 flex flex-col lg:flex-row gap-8 items-start">
      
          <aside class="w-full lg:w-72 shrink-0 space-y-8 lg:sticky lg:top-32">
             
             <div *ngIf="isLoading" class="space-y-6 animate-pulse">
                 <div class="h-48 bg-card border border-theme rounded-2xl"></div>
                 <div class="h-80 bg-card border border-theme rounded-2xl"></div>
             </div>

             <ng-container *ngIf="!isLoading">
                 
                 <div class="bg-card border border-theme rounded-2xl p-6 shadow-sm">
                    <h3 class="font-bold text-main mb-4 flex items-center gap-2">
                        <i class="ri-money-dollar-circle-line text-primary"></i> Rango de Precio
                    </h3>
                    <div class="flex items-center gap-2 mb-4">
                        <div class="relative w-full">
                            <span class="absolute left-3 top-2 text-muted text-xs">S/</span>
                            <input type="number" [(ngModel)]="minPrice" (change)="applyFilters()" class="w-full bg-input border border-theme rounded-xl pl-6 pr-2 py-2 text-sm font-bold text-main focus:border-primary outline-none transition-colors">
                        </div>
                        <span class="text-muted font-bold">-</span>
                        <div class="relative w-full">
                             <span class="absolute left-3 top-2 text-muted text-xs">S/</span>
                            <input type="number" [(ngModel)]="maxPrice" (change)="applyFilters()" class="w-full bg-input border border-theme rounded-xl pl-6 pr-2 py-2 text-sm font-bold text-main focus:border-primary outline-none transition-colors">
                        </div>
                    </div>
                    <button (click)="applyFilters()" class="w-full bg-primary hover:bg-secondary text-white text-sm font-bold py-3 rounded-xl transition-all shadow-lg shadow-primary/20">
                        Aplicar Filtro
                    </button>
                 </div>
        
                 <div class="bg-card border border-theme rounded-2xl p-6 shadow-sm">
                    <h3 class="font-bold text-main mb-4 flex items-center gap-2">
                        <i class="ri-layout-grid-line text-primary"></i> Categorías
                    </h3>
                    
                    <div class="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
                        <label *ngFor="let cat of categoriesList" class="flex items-center gap-3 cursor-pointer group select-none">
                            <div class="relative flex items-center">
                                <input type="checkbox" 
                                       [checked]="isCategorySelected(cat.nombre)" 
                                       (change)="toggleCategory(cat.nombre)"
                                       class="peer appearance-none w-5 h-5 border-2 border-theme rounded-md checked:bg-primary checked:border-primary transition-colors cursor-pointer">
                                <i class="ri-check-line absolute text-white text-xs opacity-0 peer-checked:opacity-100 left-1 top-1 pointer-events-none"></i>
                            </div>
                            <span class="text-sm text-muted group-hover:text-main transition-colors font-medium capitalize">{{ cat.nombre }}</span>
                            <span class="ml-auto text-xs bg-input px-2 py-1 rounded text-muted font-bold">{{ getCategoryCount(cat.nombre) }}</span>
                        </label>
                    </div>
                 </div>
                 
                 <button *ngIf="minPrice || maxPrice || selectedCategories.length > 0" 
                         (click)="resetFilters()"
                         class="w-full py-2 text-sm text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors flex items-center justify-center gap-2">
                     <i class="ri-delete-bin-line"></i> Limpiar Filtros
                 </button>
             </ng-container>
    
          </aside>
    
          <div class="flex-1 w-full">
             
             <div *ngIf="!isLoading" class="bg-card border border-theme rounded-2xl p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm animate-fade-in">
                <p class="text-main font-bold text-sm">
                    <span class="text-primary">{{ filteredProducts.length }}</span> productos encontrados
                </p>
                
                <div class="flex items-center gap-2">
                    <span class="text-xs text-muted font-bold uppercase hidden sm:block">Ordenar:</span>
                    <select [(ngModel)]="sortOrder" (change)="applyFilters()" class="bg-input border border-theme rounded-xl px-4 py-2 text-sm text-main font-bold outline-none focus:border-primary cursor-pointer transition-colors">
                        <option value="default">Relevancia</option>
                        <option value="low">Precio: Menor a Mayor</option>
                        <option value="high">Precio: Mayor a Menor</option>
                        <option value="new">Más Recientes</option>
                    </select>
                </div>
             </div>
    
             <div *ngIf="isLoading" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 <div *ngFor="let i of [1,2,3,4,5,6]" class="bg-card border border-theme rounded-3xl p-4 animate-pulse">
                     <div class="h-56 bg-gray-200 dark:bg-slate-800 rounded-2xl mb-4"></div>
                     <div class="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/3 mb-2"></div>
                     <div class="h-6 bg-gray-200 dark:bg-slate-800 rounded w-3/4 mb-4"></div>
                     <div class="flex justify-between items-center pt-2">
                         <div class="h-8 bg-gray-200 dark:bg-slate-800 rounded w-1/3"></div>
                         <div class="h-4 bg-gray-200 dark:bg-slate-800 rounded w-1/4"></div>
                     </div>
                 </div>
             </div>

             <div *ngIf="!isLoading && filteredProducts.length > 0; else noResults" class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-12 animate-fade-in">
                <div *ngFor="let product of paginatedProducts" class="group bg-card border border-theme rounded-3xl p-4 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 relative overflow-hidden cursor-pointer" [routerLink]="['/products', product.id]">
                    
                    <span *ngIf="isNew(product.fechaCreacion)" class="absolute top-4 left-4 bg-green-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-lg">NUEVO</span>
    
                    <div class="relative h-56 bg-white rounded-2xl mb-4 flex items-center justify-center p-6 overflow-hidden">
                        <img [src]="product.imagenUrl || 'assets/images/no-image.png'" 
                             (error)="handleImageError($event)"
                             [alt]="product.nombre"
                             class="object-contain max-h-full group-hover:scale-110 transition-transform duration-500">
                        
                        <button (click)="addToCart(product); $event.stopPropagation()" class="absolute bottom-4 right-4 w-10 h-10 bg-primary text-white rounded-xl shadow-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 flex items-center justify-center hover:bg-secondary hover:scale-110">
                            <i class="ri-shopping-bag-line"></i>
                        </button>
                    </div>
                    
                    <div class="space-y-2 px-2">
                        <p class="text-xs font-bold text-muted uppercase tracking-wider">{{ product.categoria || 'General' }}</p>
                        <h3 class="font-bold text-main text-lg leading-tight truncate group-hover:text-primary transition-colors" [title]="product.nombre">{{ product.nombre }}</h3>
                        <div class="flex items-end justify-between pt-2 border-t border-dashed border-theme/50 mt-3">
                            <span class="text-2xl font-black text-main">S/ {{ product.precio | number:'1.2-2' }}</span>
                            <span class="text-primary font-bold text-xs uppercase tracking-wider hover:underline">Ver detalles <i class="ri-arrow-right-line"></i></span>
                        </div>
                    </div>
                </div>
             </div>
    
             <ng-template #noResults>
                 <div *ngIf="!isLoading" class="flex flex-col items-center justify-center py-20 text-center bg-card border border-theme rounded-3xl border-dashed animate-fade-in">
                    <div class="w-24 h-24 bg-input rounded-full flex items-center justify-center mb-6">
                        <i class="ri-search-eye-line text-4xl text-muted"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-main mb-2">No encontramos resultados</h3>
                    <p class="text-muted max-w-xs mx-auto mb-8">Intenta ajustar tus filtros o busca con otros términos.</p>
                    <button (click)="resetFilters()" class="px-8 py-3 bg-main border border-theme hover:border-primary text-main font-bold rounded-xl transition-colors shadow-sm hover:shadow-md">
                        Limpiar Todos los Filtros
                    </button>
                 </div>
             </ng-template>
    
             <div *ngIf="!isLoading && filteredProducts.length > itemsPerPage" class="flex justify-center items-center gap-4 mt-8 pt-8 border-t border-theme animate-fade-in">
                 <button (click)="changePage(currentPage - 1)" [disabled]="currentPage === 1" class="w-12 h-12 rounded-xl border border-theme flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"><i class="ri-arrow-left-s-line text-lg"></i></button>
                 
                 <div class="px-6 py-3 rounded-xl bg-card border border-theme text-sm font-bold text-main shadow-sm">
                     Página <span class="text-primary">{{ currentPage }}</span> de {{ totalPages }}
                 </div>
                 
                 <button (click)="changePage(currentPage + 1)" [disabled]="currentPage === totalPages" class="w-12 h-12 rounded-xl border border-theme flex items-center justify-center hover:bg-primary hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md"><i class="ri-arrow-right-s-line text-lg"></i></button>
             </div>
    
          </div>
        </div>
    </div>
    
    <app-footer></app-footer>
  `,
  styles: [`
    .animate-fade-in { animation: fadeIn 0.4s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  private categoryService = inject(CategoryService);
  private cartService = inject(CartService);
  private route = inject(ActivatedRoute);

  isLoading = true;

  allProducts: any[] = [];
  categoriesList: any[] = [];
  filteredProducts: any[] = [];
  paginatedProducts: any[] = [];

  minPrice: number | null = null;
  maxPrice: number | null = null;
  selectedCategories: string[] = [];
  sortOrder: string = 'default';

  currentPage = 1;
  itemsPerPage = 12;
  totalPages = 1;

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;

    forkJoin({
      products: this.productService.getProducts(),
      categories: this.categoryService.getCategories()
    }).subscribe({
      next: (res: any) => {
        this.allProducts = res.products;
        this.categoriesList = res.categories.filter((c: any) => c.activo === 1 || c.activo === true);

        this.route.queryParams.subscribe(params => {
          const categoryParam = params['category'];
          if (categoryParam) {
            const foundCat = this.categoriesList.find(c => c.nombre.toLowerCase().trim() === categoryParam.toLowerCase().trim());
            if (foundCat) {
              this.selectedCategories = [foundCat.nombre];
            }
          }
          this.applyFilters();

          setTimeout(() => this.isLoading = false, 300);
        });
      },
      error: (err) => {
        console.error('Error:', err);
        this.isLoading = false;
      }
    });
  }

  handleImageError(event: any) {
    event.target.src = 'https://via.placeholder.com/300x300?text=GlobiShop';
  }

  applyFilters() {
    let temp = [...this.allProducts];

    if (this.minPrice) temp = temp.filter(p => p.precio >= this.minPrice!);
    if (this.maxPrice) temp = temp.filter(p => p.precio <= this.maxPrice!);

    if (this.selectedCategories.length > 0) {
      const selectedLower = this.selectedCategories.map(c => c.toLowerCase().trim());
      temp = temp.filter(p => {
        const prodCatName = (typeof p.categoria === 'string' ? p.categoria : p.categoria?.nombre || 'otros').toLowerCase().trim();
        return selectedLower.includes(prodCatName);
      });
    }

    switch (this.sortOrder) {
      case 'low': temp.sort((a, b) => a.precio - b.precio); break;
      case 'high': temp.sort((a, b) => b.precio - a.precio); break;
      case 'new': temp.sort((a, b) => new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()); break;
    }

    this.filteredProducts = temp;
    this.totalPages = Math.ceil(this.filteredProducts.length / this.itemsPerPage) || 1;
    this.currentPage = 1;
    this.updatePagination();
  }

  getCategoryCount(catName: string): number {
    const target = catName.toLowerCase().trim();
    return this.allProducts.filter(p => {
      const prodCat = (typeof p.categoria === 'string' ? p.categoria : p.categoria?.nombre || 'otros').toLowerCase().trim();
      return prodCat === target;
    }).length;
  }

  updatePagination() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedProducts = this.filteredProducts.slice(start, end);
    if (this.currentPage > 1 && !this.isLoading) window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  isCategorySelected(catName: string): boolean {
    return this.selectedCategories.includes(catName);
  }

  toggleCategory(catName: string) {
    if (this.selectedCategories.includes(catName)) {
      this.selectedCategories = this.selectedCategories.filter(c => c !== catName);
    } else {
      this.selectedCategories.push(catName);
    }
    this.applyFilters();
  }

  resetFilters() {
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedCategories = [];
    this.sortOrder = 'default';
    this.applyFilters();
  }

  addToCart(product: any) { this.cartService.addToCart(product); }

  isNew(dateString: string): boolean {
    if (!dateString) return false;
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 30;
  }
}