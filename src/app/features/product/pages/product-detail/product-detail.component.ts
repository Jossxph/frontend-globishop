import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ProfileService } from '../../../profile/services/profile.service';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-product-detail',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './product-detail.html',
    styles: [`
    .scrollbar-hide::-webkit-scrollbar { display: none; }
    .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
    .animate-fade-in { animation: fadeIn 0.5s ease-out forwards; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
  `]
})
export class ProductDetailComponent implements OnInit {
    public authService = inject(AuthService);
    private route = inject(ActivatedRoute);
    private router = inject(Router);
    private productService = inject(ProductService);
    private cartService = inject(CartService);
    private profileService = inject(ProfileService);

    isLoading = true;
    product: any = null;
    reviews: any[] = [];
    quantity: number = 1;
    canReview = false;
    isFavorite = false;

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            const id = Number(params.get('id'));
            if (id) this.loadFullData(id);
            else this.isLoading = false;
        });
    }

    // ✅ Obtiene el userId del localStorage
    private getUserId(): number | null {
        const user = this.authService.getUser();
        return user?.userId || user?.id || null;
    }

    loadFullData(id: number) {
        this.isLoading = true;
        forkJoin({
            product: this.productService.getById(id),
            reviews: this.productService.getReviews(id)
        }).subscribe({
            next: (res: any) => {
                this.product = res.product;
                this.reviews = res.reviews;
                if (this.authService.isLoggedIn()) {
                    this.checkEligibility(id);
                }
                this.isLoading = false;
            },
            error: () => {
                this.product = null;
                this.isLoading = false;
            }
        });
    }

    // ✅ CORREGIDO: envía usuarioId como @RequestParam
    checkEligibility(productId: number) {
        const usuarioId = this.getUserId();
        if (!usuarioId) return;

        this.productService.checkEligibility(productId, usuarioId).subscribe({
            next: (res: any) => this.canReview = res?.puedeResenar ?? false,
            error: () => this.canReview = false
        });
    }

    changeQty(delta: number) {
        const newVal = this.quantity + delta;
        if (newVal >= 1 && newVal <= this.product.stock) this.quantity = newVal;
    }

    addToCart() {
        this.cartService.addToCart(this.product, this.quantity);
        this.cartService.openCart();
        Swal.mixin({ toast: true, position: 'bottom-end', showConfirmButton: false, timer: 2000 })
            .fire({ icon: 'success', title: 'Agregado al carrito' });
    }

    toggleFavorite() {
        if (!this.authService.isLoggedIn()) {
            Swal.fire({
                icon: 'info', title: 'Acceso requerido',
                text: 'Inicia sesión para guardar favoritos',
                confirmButtonColor: '#0ea5e9',
                showCancelButton: true,
                confirmButtonText: 'Ir al Login',
                cancelButtonText: 'Cancelar'
            }).then((r) => { if (r.isConfirmed) this.router.navigate(['/auth/login']); });
            return;
        }

        const id = this.product.productoId || this.product.id;
        this.profileService.toggleFavorite(id).subscribe({
            next: (res: any) => {
                const msg = res.message || '';
                const isRemoved = msg.toLowerCase().includes('eliminado');
                this.isFavorite = !isRemoved;
                Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 1500 })
                    .fire({ icon: 'success', title: isRemoved ? 'Eliminado de Favoritos' : 'Guardado en Favoritos' });
            },
            error: () => Swal.fire('Error', 'No se pudo actualizar favoritos', 'error')
        });
    }

    // ✅ CORREGIDO: envía usuarioId en el body de la reseña
    writeReview() {
        const usuarioId = this.getUserId();
        if (!usuarioId) {
            Swal.fire('Error', 'No se pudo identificar tu usuario', 'error');
            return;
        }

        Swal.fire({
            title: 'Tu opinión cuenta 🌟',
            html: `
        <div class="text-left">
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Calificación</label>
          <select id="swal-rating" class="w-full p-3 border rounded-xl mb-4 bg-gray-50 outline-none focus:border-blue-500 font-bold text-gray-700">
            <option value="5">⭐⭐⭐⭐⭐ Excelente</option>
            <option value="4">⭐⭐⭐⭐ Muy bueno</option>
            <option value="3">⭐⭐⭐ Regular</option>
            <option value="2">⭐⭐ Malo</option>
            <option value="1">⭐ Pésimo</option>
          </select>
          <label class="block text-xs font-bold uppercase text-gray-500 mb-1">Comentario</label>
          <textarea id="swal-comment" class="w-full p-4 border rounded-xl h-32 bg-gray-50 outline-none focus:border-blue-500 resize-none" placeholder="¿Qué te gustó más?"></textarea>
        </div>
      `,
            showCancelButton: true,
            confirmButtonText: 'Publicar Reseña',
            confirmButtonColor: '#0ea5e9',
            cancelButtonText: 'Cancelar',
            preConfirm: () => {
                const rating = (document.getElementById('swal-rating') as HTMLSelectElement).value;
                const comment = (document.getElementById('swal-comment') as HTMLTextAreaElement).value;
                if (!comment) { Swal.showValidationMessage('Por favor escribe un comentario'); return; }
                return { calificacion: Number(rating), comentario: comment };
            }
        }).then((result) => {
            if (result.isConfirmed) {
                const data = {
                    productoId: this.product.productoId || this.product.id,
                    usuarioId: usuarioId,   // ✅ incluido
                    ...result.value
                };
                this.productService.addReview(data).subscribe({
                    next: () => {
                        Swal.fire('¡Gracias!', 'Tu reseña ha sido publicada.', 'success');
                        const pid = this.product.productoId || this.product.id;
                        this.productService.getReviews(pid).subscribe((r: any) => this.reviews = r);
                    },
                    error: (err: any) => Swal.fire('Ups', err.error?.message || 'Hubo un error al publicar', 'error')
                });
            }
        });
    }

    handleImageError(event: any) {
        event.target.src = 'https://static.vecteezy.com/system/resources/previews/022/059/000/non_2x/no-image-available-icon-vector.jpg';
    }

    isNew(dateString: string): boolean {
        if (!dateString) return false;
        const diff = Math.ceil(Math.abs(new Date().getTime() - new Date(dateString).getTime()) / (1000 * 60 * 60 * 24));
        return diff <= 30;
    }
}