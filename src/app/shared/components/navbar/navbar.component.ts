import { Component, inject, HostListener, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { ProductService } from '../../../features/product/services/product.service';
import { CartService } from '../../../features/cart/services/cart.service';
import { Subject, debounceTime, distinctUntilChanged, switchMap, of, catchError } from 'rxjs';

import { APP_ROUTES } from '../../../core/constants/app-routes';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.html'
})
export class NavbarComponent implements OnInit {
  public authService = inject(AuthService);
  private productService = inject(ProductService);
  public cartService = inject(CartService);
  private router = inject(Router);
  private elementRef = inject(ElementRef);

  readonly ROUTES = APP_ROUTES;
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
    this.router.navigate(['/' + APP_ROUTES.LOGIN]);
  }
}