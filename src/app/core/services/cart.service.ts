import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // # SEÑAL PARA CONTROLAR LA VISIBILIDAD DEL SIDEBAR DEL CARRITO
  isOpen = signal<boolean>(false);

  // # SEÑAL PRINCIPAL: LISTA DE PRODUCTOS, INICIA CARGANDO DEL LOCALSTORAGE
  cartItems = signal<any[]>(this.loadCart());

  // # CALCULO AUTOMATICO REACTIVO DEL PRECIO TOTAL (PRECIO * CANTIDAD)
  total = computed(() => this.cartItems().reduce((acc, item) => acc + (item.precio * item.cantidad), 0));

  // # CALCULO AUTOMATICO DE CANTIDAD TOTAL DE ITEMS EN EL CARRITO
  count = computed(() => this.cartItems().reduce((acc, item) => acc + item.cantidad, 0));

  // # CONVERSION A OBSERVABLES PARA FACILITAR USO EN TEMPLATES CON ASYNC PIPE
  cartItems$ = toObservable(this.cartItems);
  cartTotal$ = toObservable(this.total);
  cartCount$ = toObservable(this.count);

  constructor() { }

  // --- CONTROL VISUAL ---
  openCart() {
    this.isOpen.set(true);
  }

  closeCart() {
    this.isOpen.set(false);
  }

  toggleCart() {
    this.isOpen.update(val => !val);
  }

  // --- LOGICA DE NEGOCIO ---
  addToCart(product: any, quantity: number = 1) {
    const currentCart = this.cartItems();
    // # NORMALIZA EL ID (MANEJA SI EL BACKEND MANDA 'ID' O 'PRODUCTOID')
    const idReal = product.productoId || product.id;

    // # BUSCA SI EL PRODUCTO YA EXISTE EN EL CARRITO ACTUAL
    const existingItem = currentCart.find(item => (item.productoId || item.id) === idReal);

    if (existingItem) {
      // # SI YA EXISTE: ACTUALIZA SOLO LA CANTIDAD (NO DUPLICA EL ITEM)
      const updatedCart = currentCart.map(item =>
        (item.productoId || item.id) === idReal
          ? { ...item, cantidad: item.cantidad + quantity }
          : item
      );
      this.cartItems.set(updatedCart);
    } else {
      // # SI ES NUEVO: CREA EL OBJETO Y LO AGREGA AL ARRAY
      const newItem = {
        ...product,
        productoId: idReal,
        cantidad: quantity
      };
      this.cartItems.set([...currentCart, newItem]);
    }

    // # PERSISTE LOS CAMBIOS EN EL NAVEGADOR
    this.saveCart();
  }

  removeFromCart(productId: number) {
    // # FILTRA LA LISTA MANTENIENDO TODO LO QUE NO SEA EL ID A BORRAR
    this.cartItems.set(
      this.cartItems().filter(item => {
        const itemId = item.productoId || item.id;
        return itemId !== productId;
      })
    );
    this.saveCart();
  }

  clearCart() {
    // # RESETEA EL CARRITO A UN ARRAY VACIO
    this.cartItems.set([]);
    this.saveCart();
  }

  // --- PERSISTENCIA DE DATOS ---
  private saveCart() {
    // # GUARDA EL ARRAY DE PRODUCTOS EN LOCALSTORAGE
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private loadCart() {
    // # RECUPERA EL CARRITO GUARDADO AL RECARGAR LA PAGINA
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }
}