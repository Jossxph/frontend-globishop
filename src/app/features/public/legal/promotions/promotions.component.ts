import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-promotions',
  standalone: true,
  imports: [CommonModule, PageHeaderComponent],
  template: `
    <app-page-layout 
        title="Promociones Vigentes" 
        subtitle="TyC Campañas"
        bgImage="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80">

        <div class="max-w-4xl mx-auto space-y-8">
            
            <div class="bg-card border border-theme rounded-3xl p-8 hover:border-primary transition-colors">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <span class="bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Activa</span>
                        <h3 class="text-2xl font-black text-main mt-2">Campaña "Verano Gamer 2025"</h3>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-muted font-bold uppercase">Vigencia</p>
                        <p class="text-main font-bold">01 Ene - 31 Mar 2025</p>
                    </div>
                </div>
                
                <div class="prose prose-sm text-muted">
                    <p><strong>Beneficio:</strong> Hasta 20% de descuento en Laptops seleccionadas y envío gratis en compras mayores a S/ 2000.</p>
                    <p><strong>Restricciones:</strong></p>
                    <ul class="list-disc pl-5 space-y-1">
                        <li>No acumulable con cupones de descuento.</li>
                        <li>Máximo 2 unidades por cliente.</li>
                        <li>Válido solo para Lima Metropolitana y Callao para el envío gratis.</li>
                    </ul>
                </div>
            </div>

            <div class="bg-card border border-theme rounded-3xl p-8 opacity-75">
                <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <span class="bg-slate-200 text-slate-600 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Finalizada</span>
                        <h3 class="text-2xl font-black text-main mt-2">Cyber Wow Diciembre</h3>
                    </div>
                    <div class="text-right">
                        <p class="text-xs text-muted font-bold uppercase">Vigencia</p>
                        <p class="text-main font-bold">12 Dic - 16 Dic 2024</p>
                    </div>
                </div>
                <p class="text-sm text-muted">Campaña finalizada. Los términos se mantienen visibles solo para referencia de pedidos realizados en esas fechas.</p>
            </div>

        </div>

    </app-page-layout>
  `
})
export class PromotionsComponent { }