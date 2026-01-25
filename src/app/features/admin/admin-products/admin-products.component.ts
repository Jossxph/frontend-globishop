import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-products',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="space-y-6 animate-fade-in-up pb-24 md:pb-0">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 class="text-3xl font-black text-[var(--text-main)] tracking-tight">Inventario</h2>
          <p class="text-[var(--text-muted)] text-sm mt-1">Gestiona tu catálogo de productos.</p>
        </div>
        
        <button (click)="openModal()" class="w-full sm:w-auto bg-[var(--color-primary)] hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[var(--color-primary)]/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-1 active:scale-95">
          <i class="ri-add-circle-line text-xl"></i> Nuevo Producto
        </button>
      </div>

      <div class="hidden md:block bg-[var(--bg-card)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--bg-input)] border-b border-[var(--border-color)]">
              <tr>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider w-20">Img</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Producto</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Categoría</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Precio</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Stock</th>
                <th class="p-5 text-center text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Estado</th>
                <th class="p-5 text-center text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)] text-sm">
              <tr *ngFor="let p of paginatedProducts" class="hover:bg-[var(--bg-hover)] transition-colors group">
                <td class="p-5">
                  <div class="w-12 h-12 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] overflow-hidden flex items-center justify-center p-1">
                    <img [src]="p.imagenUrl || 'assets/images/no-image.png'" class="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform">
                  </div>
                </td>
                <td class="p-5">
                  <p class="font-bold text-[var(--text-main)] truncate max-w-[200px]" [title]="p.nombre">{{ p.nombre }}</p>
                  <p class="text-xs text-[var(--text-muted)] mt-0.5">SKU: {{ p.productoId || p.id }}</p>
                </td>
                <td class="p-5">
                  <span class="bg-[var(--bg-input)] text-[var(--text-muted)] border border-[var(--border-color)] px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap">
                      {{ p.categoria?.nombre || 'General' }}
                  </span>
                </td>
                <td class="p-5 font-black text-[var(--text-main)]">S/ {{ p.precio | number:'1.2-2' }}</td>
                <td class="p-5">
                  <div class="flex items-center gap-2">
                      <div class="w-2 h-2 rounded-full" [ngClass]="p.stock > 5 ? 'bg-green-500' : (p.stock > 0 ? 'bg-yellow-500' : 'bg-red-500')"></div>
                      <span [class]="p.stock > 5 ? 'text-green-600' : (p.stock > 0 ? 'text-yellow-600' : 'text-red-500')" class="font-bold text-xs whitespace-nowrap">
                        {{ p.stock }} uni.
                      </span>
                  </div>
                </td>
                <td class="p-5 text-center">
                   <div class="flex justify-center gap-1">
                     <span *ngIf="p.esNuevo" class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-600 border border-blue-200">NUEVO</span>
                     <span *ngIf="p.esDestacado" class="px-2 py-0.5 rounded text-[10px] font-bold bg-yellow-100 text-yellow-700 border border-yellow-200">TOP</span>
                   </div>
                </td>
                <td class="p-5 text-center">
                   <div class="flex items-center justify-center gap-2">
                       <button (click)="openModal(p)" class="w-8 h-8 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-all flex items-center justify-center cursor-pointer shadow-sm">
                           <i class="ri-edit-line"></i>
                       </button>
                       <button (click)="deleteProduct(p)" class="w-8 h-8 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--color-error)] hover:text-white text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--color-error)] transition-all flex items-center justify-center cursor-pointer shadow-sm">
                           <i class="ri-delete-bin-line"></i>
                       </button>
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div *ngIf="products.length === 0" class="p-16 text-center text-[var(--text-muted)]">
           <div class="w-20 h-20 bg-[var(--bg-input)] rounded-full flex items-center justify-center mx-auto mb-4 border border-[var(--border-color)] border-dashed">
               <i class="ri-inbox-line text-4xl opacity-50"></i>
           </div>
           <p class="font-medium">No hay productos registrados.</p>
           <p class="text-xs mt-1">Empieza agregando uno nuevo.</p>
        </div>
      </div>

      <div class="md:hidden grid gap-4">
          <div *ngFor="let p of paginatedProducts" class="bg-[var(--bg-card)] p-5 rounded-2xl shadow-sm border border-[var(--border-color)] flex flex-col gap-4 relative overflow-hidden">
              
              <div class="absolute top-0 right-0 flex">
                  <span *ngIf="p.esNuevo" class="bg-blue-500 text-white text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm">NUEVO</span>
                  <span *ngIf="p.esDestacado" class="bg-yellow-400 text-slate-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg shadow-sm" [class.rounded-bl-none]="p.esNuevo">TOP</span>
              </div>

              <div class="flex gap-4">
                  <div class="w-20 h-20 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] overflow-hidden shrink-0 p-1 flex items-center justify-center">
                      <img [src]="p.imagenUrl || 'assets/images/no-image.png'" class="max-w-full max-h-full object-contain">
                  </div>
                  <div class="flex-1 min-w-0 pt-1">
                      <h3 class="font-bold text-[var(--text-main)] truncate text-sm leading-tight">{{ p.nombre }}</h3>
                      <p class="text-xs text-[var(--text-muted)] mt-1 mb-2">{{ p.categoria?.nombre || 'Sin cat.' }}</p>
                      <div class="flex items-center gap-2 flex-wrap">
                          <span class="text-lg font-black text-[var(--text-main)]">S/ {{ p.precio | number:'1.2-2' }}</span>
                          <span class="text-xs px-2 py-0.5 rounded font-bold border" 
                                [ngClass]="p.stock > 0 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'">
                              Stock: {{ p.stock }}
                          </span>
                      </div>
                  </div>
              </div>

              <div class="grid grid-cols-2 gap-3 pt-3 border-t border-[var(--border-color)] border-dashed">
                  <button (click)="openModal(p)" class="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-muted)] text-sm font-bold border border-[var(--border-color)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors active:scale-95">
                      <i class="ri-edit-line"></i> Editar
                  </button>
                  <button (click)="deleteProduct(p)" class="flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-muted)] text-sm font-bold border border-[var(--border-color)] hover:border-[var(--color-error)] hover:text-[var(--color-error)] transition-colors active:scale-95">
                      <i class="ri-delete-bin-line"></i> Eliminar
                  </button>
              </div>
          </div>
      </div>

      <div *ngIf="totalPages > 1" class="flex justify-between items-center bg-[var(--bg-card)] p-4 rounded-xl border border-[var(--border-color)] shadow-sm sticky bottom-4 z-10 mx-auto max-w-full">
         <button (click)="changePage(currentPage - 1)" 
                 [disabled]="currentPage === 1"
                 class="px-4 py-2 rounded-lg text-sm font-bold border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-input)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors active:scale-95">
             <i class="ri-arrow-left-s-line"></i> <span class="hidden sm:inline">Anterior</span>
         </button>

         <span class="text-sm font-bold text-[var(--text-main)] font-mono">
             Pág {{ currentPage }} / {{ totalPages }}
         </span>

         <button (click)="changePage(currentPage + 1)" 
                 [disabled]="currentPage === totalPages"
                 class="px-4 py-2 rounded-lg text-sm font-bold border border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-input)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors active:scale-95">
             <span class="hidden sm:inline">Siguiente</span> <i class="ri-arrow-right-s-line"></i>
         </button>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 backdrop-blur-md bg-slate-900/60 animate-fade-in">
        
        <div class="absolute inset-0" (click)="closeModal()"></div>
        
        <div class="bg-[var(--bg-card)] w-full md:max-w-2xl h-[90vh] md:h-auto md:max-h-[90vh] rounded-t-3xl md:rounded-3xl shadow-2xl relative z-10 flex flex-col border border-[var(--border-color)] animate-slide-up">
          
          <div class="p-5 md:p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-input)] rounded-t-3xl sticky top-0 z-20">
            <h3 class="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <i class="ri-pencil-ruler-2-line text-[var(--color-primary)]"></i>
              {{ isEditing ? 'Editar Producto' : 'Nuevo Producto' }}
            </h3>
            <button (click)="closeModal()" class="w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--color-error)] transition-colors flex items-center justify-center cursor-pointer active:rotate-90">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>

          <div class="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
            <form [formGroup]="productForm" class="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              <div class="md:col-span-2">
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Nombre del Producto</label>
                <input type="text" formControlName="nombre" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/50" placeholder="Ej: Laptop Gamer X500">
              </div>
              
              <div>
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Categoría</label>
                <div class="relative">
                    <select formControlName="categoriaId" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] outline-none appearance-none cursor-pointer">
                        <option [ngValue]="null" disabled>Selecciona...</option>
                        <option *ngFor="let c of categories" [value]="c.categoriaId || c.id">{{ c.nombre }}</option>
                    </select>
                    <i class="ri-arrow-down-s-line absolute right-4 top-3.5 text-[var(--text-muted)] pointer-events-none"></i>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Stock</label>
                <input type="number" formControlName="stock" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] outline-none">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Precio (S/)</label>
                <input type="number" formControlName="precio" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] font-black focus:border-[var(--color-primary)] outline-none">
              </div>

              <div class="flex flex-col justify-center gap-3 pt-2">
                <label class="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-input)] transition-colors border border-transparent hover:border-[var(--border-color)]">
                  <input type="checkbox" formControlName="esNuevo" class="w-5 h-5 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)] cursor-pointer accent-[var(--color-primary)]">
                  <span class="text-sm font-bold text-[var(--text-main)] group-hover:text-[var(--color-primary)] transition-colors">Marcar como Nuevo</span>
                </label>
                <label class="flex items-center gap-3 cursor-pointer group p-2 rounded-lg hover:bg-[var(--bg-input)] transition-colors border border-transparent hover:border-[var(--border-color)]">
                  <input type="checkbox" formControlName="esDestacado" class="w-5 h-5 text-yellow-400 rounded focus:ring-yellow-400 cursor-pointer accent-yellow-400">
                  <span class="text-sm font-bold text-[var(--text-main)] group-hover:text-yellow-500 transition-colors">Marcar como Destacado</span>
                </label>
              </div>

              <div class="md:col-span-2">
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">URL de Imagen</label>
                <div class="flex gap-4">
                   <div class="flex-1 relative">
                       <i class="ri-link absolute left-4 top-3.5 text-[var(--text-muted)]"></i>
                       <input type="text" formControlName="imagenUrl" placeholder="https://..." class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] outline-none">
                   </div>
                   <div class="w-12 h-12 bg-[var(--bg-card)] rounded-xl border border-[var(--border-color)] overflow-hidden shrink-0 flex items-center justify-center p-1 shadow-sm">
                      <img [src]="productForm.get('imagenUrl')?.value || 'assets/images/no-image.png'" class="max-w-full max-h-full object-contain">
                   </div>
                </div>
              </div>

              <div class="md:col-span-2">
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Descripción</label>
                <textarea formControlName="descripcion" rows="3" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] outline-none resize-none" placeholder="Describe el producto..."></textarea>
              </div>

            </form>
          </div>

          <div class="p-6 border-t border-[var(--border-color)] bg-[var(--bg-input)] flex justify-end gap-3 rounded-b-none md:rounded-b-3xl">
            <button (click)="closeModal()" class="px-6 py-3 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] font-bold hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] transition-colors cursor-pointer active:scale-95">
              Cancelar
            </button>
            <button (click)="saveProduct()" [disabled]="productForm.invalid" class="px-8 py-3 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:brightness-110 shadow-lg shadow-[var(--color-primary)]/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 active:scale-95">
              <i class="ri-save-line"></i> {{ isEditing ? 'Guardar' : 'Crear' }}
            </button>
          </div>

        </div>
      </div>

    </div>
  `,
  styles: [`
    .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
    @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes slideUp { from { opacity: 0; transform: translateY(50px); } to { opacity: 1; transform: translateY(0); } }
    .custom-scrollbar::-webkit-scrollbar { width: 6px; }
    .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
    .custom-scrollbar::-webkit-scrollbar-thumb { background: var(--border-color); border-radius: 10px; }
  `]
})
export class AdminProductsComponent implements OnInit {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  products: any[] = [];
  categories: any[] = [];

  currentPage = 1;
  itemsPerPage = 10;

  isModalOpen = false;
  isEditing = false;
  currentId: number | null = null;

  productForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoriaId: [null, Validators.required],
    imagenUrl: [''],
    esNuevo: [false],
    esDestacado: [false]
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getProducts().subscribe(data => this.products = data);
    this.adminService.getCategories().subscribe(data => this.categories = data);
  }

  get totalPages() {
    return Math.ceil(this.products.length / this.itemsPerPage) || 1;
  }

  get paginatedProducts() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.products.slice(start, start + this.itemsPerPage);
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  openModal(product: any = null) {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';

    if (product) {
      this.isEditing = true;
      this.currentId = product.productoId || product.id;
      this.productForm.patchValue({
        nombre: product.nombre,
        descripcion: product.descripcion,
        precio: product.precio,
        stock: product.stock,
        categoriaId: product.categoria?.categoriaId || product.categoria?.id,
        imagenUrl: product.imagenUrl,
        esNuevo: product.esNuevo,
        esDestacado: product.esDestacado
      });
    } else {
      this.isEditing = false;
      this.currentId = null;
      this.productForm.reset({ precio: 0, stock: 0, esNuevo: false, esDestacado: false });
    }
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  saveProduct() {
    if (this.productForm.invalid) return;

    const request = this.isEditing
      ? this.adminService.updateProduct(this.currentId!, this.productForm.value)
      : this.adminService.createProduct(this.productForm.value);

    request.subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Guardado correctamente', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, background: 'var(--bg-card)', color: 'var(--text-main)' });
        this.closeModal();
        this.loadData();
      },
      error: (err) => Swal.fire('Error', err.error?.message || 'Error al guardar', 'error')
    });
  }

  deleteProduct(product: any) {
    Swal.fire({
      title: '¿Eliminar producto?',
      text: "Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: 'var(--bg-card)',
      color: 'var(--text-main)'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteProduct(product.productoId || product.id).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Eliminado', text: 'El producto ha sido borrado.', confirmButtonColor: '#0ea5e9', background: 'var(--bg-card)', color: 'var(--text-main)' });
            this.loadData();
          },
          error: () => Swal.fire('Error', 'No se puede eliminar (posiblemente tiene pedidos asociados)', 'error')
        });
      }
    });
  }
}