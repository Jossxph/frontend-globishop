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
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div *ngFor="let fav of favorites" class="bg-card border border-theme rounded-2xl p-4 relative group hover:shadow-md transition-all">
           
           <button (click)="removeFavorite(fav.producto.productoId || fav.producto.id)" class="absolute top-2 right-2 w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-full flex items-center justify-center transition-colors cursor-pointer z-10 shadow-sm" title="Quitar de favoritos">
             <i class="ri-heart-dislike-line"></i>
           </button>
           
           <div class="h-32 bg-input rounded-xl mb-3 flex items-center justify-center p-2 relative overflow-hidden">
              <img [src]="fav.producto.imagenUrl || 'https://via.placeholder.com/150'" class="h-full object-contain mix-blend-multiply dark:mix-blend-normal">
           </div>
           
           <h4 class="font-bold text-main text-sm truncate mb-1">{{ fav.producto.nombre }}</h4>
           
           <p class="text-primary font-black">S/ {{ fav.producto.precio }}</p>
           
           <a [routerLink]="['/products', fav.producto.productoId || fav.producto.id]" class="mt-3 block text-center bg-input hover:bg-primary hover:text-white text-xs font-bold py-2.5 rounded-lg transition-colors cursor-pointer border border-theme hover:border-primary">
             Ver Producto
           </a>
        </div>
      </div>
      
      <div *ngIf="favorites.length === 0 && !loading" class="text-center py-16 bg-card rounded-2xl border border-dashed border-theme">
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
        this.favorites = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  removeFavorite(productId: number) {
    this.profileService.toggleFavorite(productId).subscribe({
      next: () => {
        const Toast = Swal.mixin({
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true
        });
        Toast.fire({ icon: 'success', title: 'Eliminado de favoritos' });
        this.loadFavorites();
      },
      error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
    });
  }
}