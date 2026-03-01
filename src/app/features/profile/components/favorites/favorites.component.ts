import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="animate-fade-in-up">

      <div *ngIf="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-pulse">
        <div *ngFor="let i of [1,2,3,4]" class="bg-card border border-theme rounded-2xl p-4 h-52">
          <div class="h-32 bg-input rounded-xl mb-3"></div>
          <div class="h-4 bg-input rounded w-3/4 mb-2"></div>
          <div class="h-8 bg-input rounded"></div>
        </div>
      </div>

      <div *ngIf="!loading && favorites.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div *ngFor="let fav of favorites" class="bg-card border border-theme rounded-2xl p-4 relative group hover:shadow-md transition-all">

          <button (click)="removeFavorite(fav.productoId)"
            class="absolute top-2 right-2 w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10 shadow-sm"
            title="Quitar de favoritos">
            <i class="ri-heart-dislike-line"></i>
          </button>

          <div class="h-32 bg-input rounded-xl mb-3 flex items-center justify-center">
            <i class="ri-heart-fill text-5xl text-red-300 group-hover:scale-110 transition-transform"></i>
          </div>

          <h4 class="font-bold text-main text-sm mb-1">Producto #{{ fav.productoId }}</h4>

          <a [routerLink]="['/products', fav.productoId]"
            class="mt-3 block text-center bg-input hover:bg-primary hover:text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer border border-theme hover:border-primary">
            Ver Producto
          </a>
        </div>
      </div>

      <div *ngIf="!loading && favorites.length === 0" class="text-center py-16 bg-card rounded-2xl border border-dashed border-theme">
        <i class="ri-heart-line text-4xl text-muted mb-2 block"></i>
        <p class="text-muted">Tu lista de deseos está vacía.</p>
        <a routerLink="/" class="text-primary font-bold hover:underline text-sm mt-2 block cursor-pointer">Explorar productos</a>
      </div>

    </div>
  `
})
export class FavoritesComponent implements OnInit {
  private profileService = inject(ProfileService);
  favorites: any[] = [];
  loading = true;

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.loading = true;
    this.profileService.getFavorites().subscribe({
      next: (data: any) => {
        this.favorites = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  removeFavorite(productoId: number) {
    this.profileService.toggleFavorite(productoId).subscribe({
      next: () => {
        Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 })
            .fire({ icon: 'success', title: 'Eliminado de favoritos' });
        this.favorites = this.favorites.filter(f => f.productoId !== productoId);
      },
      error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
    });
  }
}