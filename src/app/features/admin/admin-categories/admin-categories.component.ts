import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AdminService } from '../../../core/services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-categories',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="space-y-6 animate-fade-in-up pb-24 md:pb-0">
      
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h2 class="text-3xl font-black text-[var(--text-main)] tracking-tight">Categorías</h2>
          <p class="text-[var(--text-muted)] text-sm mt-1">Organiza los departamentos de tu tienda.</p>
        </div>
        
        <button (click)="openModal()" class="w-full sm:w-auto bg-[var(--color-primary)] hover:brightness-110 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-[var(--color-primary)]/30 flex items-center justify-center gap-2 transition-all cursor-pointer hover:-translate-y-1 active:scale-95">
          <i class="ri-add-line text-xl"></i> Nueva Categoría
        </button>
      </div>

      <div class="hidden md:block bg-[var(--bg-card)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden">
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead class="bg-[var(--bg-input)] border-b border-[var(--border-color)]">
              <tr>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider w-20">Icono</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Nombre</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Descripción</th>
                <th class="p-5 text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider text-center">ID</th>
                <th class="p-5 text-center text-xs font-bold uppercase text-[var(--text-muted)] tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-[var(--border-color)] text-sm">
              <tr *ngFor="let c of categories" class="hover:bg-[var(--bg-hover)] transition-colors group">
                <td class="p-5">
                  <div class="w-12 h-12 rounded-xl bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-center text-2xl text-[var(--color-primary)]">
                    <img *ngIf="c.imagenUrl" [src]="c.imagenUrl" class="w-full h-full object-cover rounded-xl">
                    <i *ngIf="!c.imagenUrl" class="ri-layout-grid-line"></i>
                  </div>
                </td>
                <td class="p-5 font-bold text-[var(--text-main)]">{{ c.nombre }}</td>
                <td class="p-5 text-[var(--text-muted)] max-w-xs truncate">{{ c.descripcion || 'Sin descripción' }}</td>
                <td class="p-5 text-center font-mono text-xs text-[var(--text-muted)] bg-[var(--bg-input)] rounded w-fit mx-auto px-2">
                    #{{ c.categoriaId || c.id }}
                </td>
                <td class="p-5 text-center">
                   <div class="flex items-center justify-center gap-2">
                       <button (click)="openModal(c)" class="w-8 h-8 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--color-primary)] hover:text-white text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--color-primary)] transition-all flex items-center justify-center cursor-pointer shadow-sm">
                           <i class="ri-edit-line"></i>
                       </button>
                       <button (click)="deleteCategory(c)" class="w-8 h-8 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--color-error)] hover:text-white text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--color-error)] transition-all flex items-center justify-center cursor-pointer shadow-sm">
                           <i class="ri-delete-bin-line"></i>
                       </button>
                   </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div *ngIf="categories.length === 0" class="p-16 text-center text-[var(--text-muted)]">
           <i class="ri-folder-open-line text-4xl opacity-50 mb-2"></i>
           <p class="font-medium">No hay categorías creadas.</p>
        </div>
      </div>

      <div class="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div *ngFor="let c of categories" class="bg-[var(--bg-card)] p-5 rounded-2xl shadow-sm border border-[var(--border-color)] flex flex-col gap-4 relative overflow-hidden group">
              
              <div class="flex items-center gap-4">
                  <div class="w-14 h-14 rounded-2xl bg-[var(--bg-input)] border border-[var(--border-color)] flex items-center justify-center text-2xl text-[var(--color-primary)] shrink-0">
                      <img *ngIf="c.imagenUrl" [src]="c.imagenUrl" class="w-full h-full object-cover rounded-xl">
                      <i *ngIf="!c.imagenUrl" class="ri-layout-grid-fill"></i>
                  </div>
                  <div class="min-w-0">
                      <h3 class="font-bold text-[var(--text-main)] truncate text-lg">{{ c.nombre }}</h3>
                      <p class="text-xs text-[var(--text-muted)] truncate">ID: {{ c.categoriaId || c.id }}</p>
                  </div>
              </div>

              <p class="text-sm text-[var(--text-muted)] line-clamp-2 bg-[var(--bg-input)] p-2 rounded-lg border border-[var(--border-color)] border-dashed">
                  {{ c.descripcion || 'Sin descripción disponible.' }}
              </p>

              <div class="grid grid-cols-2 gap-3 pt-2">
                  <button (click)="openModal(c)" class="flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--bg-input)] text-[var(--text-muted)] text-sm font-bold border border-[var(--border-color)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors active:scale-95">
                      <i class="ri-edit-line"></i> Editar
                  </button>
                  <button (click)="deleteCategory(c)" class="flex items-center justify-center gap-2 py-2 rounded-xl bg-[var(--bg-input)] text-[var(--text-muted)] text-sm font-bold border border-[var(--border-color)] hover:border-[var(--color-error)] hover:text-[var(--color-error)] transition-colors active:scale-95">
                      <i class="ri-delete-bin-line"></i> Borrar
                  </button>
              </div>
          </div>
      </div>

      <div *ngIf="isModalOpen" class="fixed inset-0 z-50 flex items-end md:items-center justify-center md:p-4 backdrop-blur-md bg-slate-900/60 animate-fade-in">
        
        <div class="absolute inset-0" (click)="closeModal()"></div>
        
        <div class="bg-[var(--bg-card)] w-full md:max-w-lg h-auto rounded-t-3xl md:rounded-3xl shadow-2xl relative z-10 flex flex-col border border-[var(--border-color)] animate-slide-up">
          
          <div class="p-5 md:p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-input)] rounded-t-3xl">
            <h3 class="text-lg font-bold text-[var(--text-main)] flex items-center gap-2">
              <i class="ri-shape-line text-[var(--color-primary)]"></i>
              {{ isEditing ? 'Editar Categoría' : 'Nueva Categoría' }}
            </h3>
            <button (click)="closeModal()" class="w-8 h-8 rounded-full hover:bg-[var(--bg-hover)] text-[var(--text-muted)] hover:text-[var(--color-error)] transition-colors flex items-center justify-center cursor-pointer">
              <i class="ri-close-line text-xl"></i>
            </button>
          </div>

          <div class="p-6 md:p-8 space-y-5">
            <form [formGroup]="categoryForm" class="space-y-5">
              
              <div>
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Nombre</label>
                <input type="text" formControlName="nombre" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] outline-none transition-all placeholder:text-[var(--text-muted)]/50" placeholder="Ej: Tecnología">
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">URL de Icono/Imagen</label>
                <div class="flex gap-4">
                    <div class="flex-1 relative">
                        <i class="ri-image-line absolute left-4 top-3.5 text-[var(--text-muted)]"></i>
                        <input type="text" formControlName="imagenUrl" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl pl-10 pr-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] outline-none" placeholder="https://...">
                    </div>
                    <div class="w-12 h-12 bg-[var(--bg-input)] rounded-xl border border-[var(--border-color)] flex items-center justify-center shrink-0 overflow-hidden">
                        <img [src]="categoryForm.get('imagenUrl')?.value || 'assets/no-img'" class="w-full h-full object-cover" (error)="handleImgError($event)">
                    </div>
                </div>
              </div>

              <div>
                <label class="block text-xs font-bold uppercase text-[var(--text-muted)] mb-1.5 ml-1">Descripción</label>
                <textarea formControlName="descripcion" rows="3" class="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-[var(--text-main)] focus:border-[var(--color-primary)] outline-none resize-none" placeholder="Breve descripción..."></textarea>
              </div>

            </form>
          </div>

          <div class="p-6 border-t border-[var(--border-color)] bg-[var(--bg-input)] flex justify-end gap-3 rounded-b-none md:rounded-b-3xl">
            <button (click)="closeModal()" class="px-6 py-2.5 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] font-bold hover:bg-[var(--bg-card)] hover:text-[var(--text-main)] transition-colors cursor-pointer">
              Cancelar
            </button>
            <button (click)="saveCategory()" [disabled]="categoryForm.invalid" class="px-8 py-2.5 rounded-xl bg-[var(--color-primary)] text-white font-bold hover:brightness-110 shadow-lg shadow-[var(--color-primary)]/20 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2">
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
  `]
})
export class AdminCategoriesComponent implements OnInit {
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  categories: any[] = [];
  isModalOpen = false;
  isEditing = false;
  currentId: number | null = null;

  categoryForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    descripcion: [''],
    imagenUrl: ['']
  });

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.adminService.getCategories().subscribe(data => this.categories = data);
  }

  openModal(category: any = null) {
    this.isModalOpen = true;
    document.body.style.overflow = 'hidden';

    if (category) {
      this.isEditing = true;
      this.currentId = category.categoriaId || category.id;
      this.categoryForm.patchValue({
        nombre: category.nombre,
        descripcion: category.descripcion,
        imagenUrl: category.imagenUrl
      });
    } else {
      this.isEditing = false;
      this.currentId = null;
      this.categoryForm.reset();
    }
  }

  closeModal() {
    this.isModalOpen = false;
    document.body.style.overflow = 'auto';
  }

  saveCategory() {
    if (this.categoryForm.invalid) return;

    const request = this.isEditing
      ? this.adminService.updateCategory(this.currentId!, this.categoryForm.value)
      : this.adminService.createCategory(this.categoryForm.value);

    request.subscribe({
      next: () => {
        Swal.fire({ icon: 'success', title: 'Guardado', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, background: 'var(--bg-card)', color: 'var(--text-main)' });
        this.closeModal();
        this.loadData();
      },
      error: (err) => Swal.fire('Error', err.error?.message || 'Error al guardar', 'error')
    });
  }

  deleteCategory(category: any) {
    Swal.fire({
      title: '¿Borrar categoría?',
      text: "Si tiene productos asociados, esto podría fallar.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#64748b',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar',
      background: 'var(--bg-card)',
      color: 'var(--text-main)'
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteCategory(category.categoriaId || category.id).subscribe({
          next: () => {
            Swal.fire({ icon: 'success', title: 'Eliminado', toast: true, position: 'top-end', showConfirmButton: false, timer: 1500, background: 'var(--bg-card)', color: 'var(--text-main)' });
            this.loadData();
          },
          error: () => Swal.fire('Error', 'No se puede borrar (posiblemente en uso)', 'error')
        });
      }
    });
  }

  handleImgError(event: any) {
    event.target.style.display = 'none';
    event.target.parentElement.innerHTML = '<i class="ri-image-line"></i>';
  }
}