import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      <div class="mb-8 animate-bounce">
        <i class="ri-ghost-line text-9xl text-slate-300"></i>
      </div>

      <h1 class="text-6xl font-black text-slate-800 mb-2">404</h1>
      <h2 class="text-2xl font-bold text-slate-600 mb-4">¡Ups! Te perdiste en el espacio</h2>
      <p class="text-slate-500 max-w-md mb-8">
        La página que buscas no existe o fue movida. No te preocupes, puedes volver a la tienda.
      </p>

      <a routerLink="/" 
         class="px-8 py-3 bg-primary text-white font-bold rounded-full shadow-lg hover:bg-sky-600 transition-all hover:scale-105">
         Volver al Inicio
      </a>
    </div>
  `
})
export class NotFoundComponent { }