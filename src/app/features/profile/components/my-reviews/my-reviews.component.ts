import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProfileService } from '../../../../core/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-my-reviews',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="animate-fade-in-up grid grid-cols-1 md:grid-cols-2 gap-4">
      
      <div *ngFor="let review of reviews" class="bg-card border border-theme p-5 rounded-2xl flex gap-4 hover:border-primary/50 transition-all shadow-sm group relative">
         
         <button (click)="$event.stopPropagation(); deleteReview(review.resenaId || review.id)" class="absolute top-3 right-3 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer p-1" title="Eliminar reseña">
           <i class="ri-delete-bin-line text-lg"></i>
         </button>

         <div class="flex gap-4 w-full cursor-pointer" [routerLink]="['/products', review.producto.productoId || review.producto.id]">
             
             <div class="w-16 h-16 bg-input rounded-xl flex items-center justify-center shrink-0 border border-theme p-1">
                <img [src]="review.producto.imagenUrl || 'https://via.placeholder.com/60'" class="w-full h-full object-contain mix-blend-multiply dark:mix-blend-normal">
             </div>
             
             <div class="flex-1 min-w-0">
               <div class="flex items-center gap-2 mb-1">
                 <span class="font-bold text-main text-sm truncate">{{ review.producto.nombre }}</span>
               </div>
               
               <div class="flex text-yellow-400 text-xs mb-2">
                 <i *ngFor="let s of [1,2,3,4,5]" [class]="s <= review.calificacion ? 'ri-star-fill' : 'ri-star-line'"></i>
               </div>

               <p class="text-sm text-muted italic line-clamp-2">"{{ review.comentario }}"</p>
               <p class="text-[10px] text-muted mt-2 opacity-60 font-bold uppercase">{{ review.fecha | date:'mediumDate' }}</p>
             </div>
         </div>
      </div>
      
      <div *ngIf="reviews.length === 0 && !loading" class="col-span-full text-center py-16 bg-card rounded-2xl border border-dashed border-theme">
         <i class="ri-chat-smile-2-line text-4xl text-muted mb-2 block"></i>
         <p class="text-muted">Aún no has compartido tu opinión sobre ningún producto.</p>
      </div>
    </div>
  `
})
export class MyReviewsComponent implements OnInit {
  private profileService = inject(ProfileService);
  reviews: any[] = [];
  loading = true;

  ngOnInit() {
    this.loadReviews();
  }

  loadReviews() {
    this.loading = true;
    this.profileService.getReviews().subscribe({
      next: (data) => {
        this.reviews = data;
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }

  deleteReview(reviewId: number) {
    Swal.fire({
      title: '¿Borrar reseña?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.profileService.deleteReview(reviewId).subscribe({
          next: () => {
            Swal.fire('Eliminada', 'Tu reseña ha sido borrada.', 'success');
            this.loadReviews();
          },
          error: () => Swal.fire('Error', 'No se pudo eliminar', 'error')
        });
      }
    });
  }
}