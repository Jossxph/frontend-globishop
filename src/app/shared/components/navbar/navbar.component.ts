import { Component, inject, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../core/services/product.service';
import { CartService } from '../../../core/services/cart.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';
import { CartSidebarComponent } from '../cart-sidebar/cart-sidebar.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule, CartSidebarComponent],
  template: `
    <nav class="fixed top-0 left-0 w-full z-[100] transition-all duration-300"
         [ngClass]="{'bg-card/90 backdrop-blur-md border-b border-theme shadow-sm': isScrolled, 'bg-transparent py-4': !isScrolled}">
      
      <div class="container mx-auto px-4">
        <div class="flex items-center justify-between h-16 md:h-20 gap-4">

          <a routerLink="/" class="flex items-center gap-2 group shrink-0">
            <div class="w-10 h-10 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">G</div>
            <span class="text-xl md:text-2xl font-black text-main tracking-tight group-hover:text-primary transition-colors">Globi<span class="text-primary">Shop</span></span>
          </a>

          <div class="hidden md:block flex-1 max-w-xl relative mx-auto z-50">
             <div class="relative group">
               <input type="text" [(ngModel)]="searchTerm" (keyup)="onSearch($event)" (focus)="showResults = true"
                 placeholder="Buscar productos..." 
                 class="w-full bg-input border border-theme rounded-full pl-12 pr-4 py-2.5 text-sm text-main focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all shadow-sm">
               <i class="ri-search-2-line absolute left-4 top-2.5 text-muted group-focus-within:text-primary transition-colors text-lg"></i>
             </div>
             <div *ngIf="showResults && searchResults.length > 0" class="absolute top-full left-0 w-full mt-2 bg-card border border-theme rounded-2xl shadow-xl overflow-hidden animate-fade-in-up">
               <a *ngFor="let product of searchResults" [routerLink]="['/products', product.productoId || product.id]" (click)="closeSearch()"
                  class="flex items-center gap-3 p-2 hover:bg-input rounded-xl transition-colors cursor-pointer group m-2">
                  <div class="w-10 h-10 bg-white rounded-lg p-1 border border-theme shrink-0"><img [src]="product.imagenUrl" class="max-h-full mx-auto"></div>
                  <div class="flex-1 min-w-0"><h4 class="text-sm font-bold text-main truncate">{{ product.nombre }}</h4><p class="text-xs text-primary font-bold">S/ {{ product.precio }}</p></div>
               </a>
             </div>
          </div>

          <div class="flex items-center gap-2 md:gap-4 shrink-0">
            
            <button (click)="openCartDrawer()" class="relative w-10 h-10 rounded-full hover:bg-input flex items-center justify-center text-muted hover:text-primary transition-colors cursor-pointer">
              <i class="ri-shopping-cart-2-line text-xl"></i>
              <span *ngIf="cartService.count() > 0" class="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-card animate-bounce">
                {{ cartService.count() }}
              </span>
            </button>

            <ng-container *ngIf="!currentUser">
              <div class="hidden md:flex items-center gap-2">
                <a routerLink="/auth/login" class="text-sm font-bold text-muted hover:text-main px-3 py-2 transition-colors">Ingresar</a>
                <a routerLink="/auth/register" class="bg-primary hover:bg-secondary text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-lg shadow-primary/30 hover:-translate-y-0.5">Registro</a>
              </div>
            </ng-container>

            <div *ngIf="currentUser" class="relative hidden md:block" (clickOutside)="isProfileOpen = false">
              <button (click)="isProfileOpen = !isProfileOpen" class="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full border border-transparent hover:border-theme hover:bg-input transition-all">
                <div class="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-primary p-0.5">
                   <img *ngIf="currentUser.fotoUrl" [src]="currentUser.fotoUrl" class="w-full h-full rounded-full object-cover bg-card">
                   <div *ngIf="!currentUser.fotoUrl" class="w-full h-full rounded-full bg-card flex items-center justify-center text-xs font-bold text-primary">{{ currentUser.nombre?.charAt(0) }}</div>
                </div>
              </button>
              <div *ngIf="isProfileOpen" class="absolute top-full right-0 mt-2 w-56 bg-card border border-theme rounded-2xl shadow-xl overflow-hidden animate-fade-in-up py-1">
                 <div class="px-4 py-3 border-b border-theme bg-input/30"><p class="text-xs text-muted font-bold uppercase">Hola,</p><p class="text-sm font-bold text-main truncate">{{ currentUser.nombre }}</p></div>
                 <a routerLink="/profile" class="flex items-center gap-3 px-4 py-3 hover:bg-input text-sm text-main"><i class="ri-user-settings-line text-primary"></i> Mi Perfil</a>
                 <button (click)="logout()" class="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 text-sm text-red-500 text-left"><i class="ri-logout-box-r-line"></i> Salir</button>
              </div>
            </div>

            <button (click)="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden w-10 h-10 rounded-xl bg-input text-main flex items-center justify-center text-xl"><i class="ri-menu-4-line"></i></button>
          </div>
        </div>
      </div>
      
      <div *ngIf="isMobileMenuOpen" class="md:hidden bg-card border-t border-theme absolute w-full left-0 top-full shadow-2xl animate-fade-in-down h-[calc(100vh-64px)] overflow-y-auto">
         </div>
    </nav>

    

  `
})
export class NavbarComponent implements OnInit {
  private authService = inject(AuthService);
  private productService = inject(ProductService);
  public cartService = inject(CartService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  currentUser: any = null;
  isScrolled = false;
  isMobileMenuOpen = false;
  isProfileOpen = false;

  searchTerm = '';
  searchResults: any[] = [];
  showResults = false;
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term) => {
        if (!term || term.length < 2) return of([]);
        return this.productService.searchProducts(term).pipe(catchError(() => of([])));
      })
    ).subscribe((results) => {
      this.searchResults = results;
      this.showResults = true;
    });
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user: any) => this.currentUser = user);
  }

  openCartDrawer() {
    this.cartService.openCart();
  }
  @HostListener('window:scroll', [])
  onWindowScroll() { this.isScrolled = window.scrollY > 20; }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isProfileOpen = false;
    }
  }

  onSearch(event: any) { this.searchSubject.next(this.searchTerm); }
  closeSearch() { this.showResults = false; }
  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}