import { Injectable, signal, computed } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  isOpen = signal<boolean>(false);

  cartItems = signal<any[]>(this.loadCart());

  total = computed(() => this.cartItems().reduce((acc, item) => acc + (item.precio * item.cantidad), 0));
  count = computed(() => this.cartItems().reduce((acc, item) => acc + item.cantidad, 0));

  cartItems$ = toObservable(this.cartItems);
  cartTotal$ = toObservable(this.total);
  cartCount$ = toObservable(this.count);

  constructor() { }

  openCart() {
    this.isOpen.set(true);
  }

  closeCart() {
    this.isOpen.set(false);
  }

  toggleCart() {
    this.isOpen.update(val => !val);
  }

  addToCart(product: any, quantity: number = 1) {
    const currentCart = this.cartItems();
    const idReal = product.productoId || product.id;
    const existingItem = currentCart.find(item => (item.productoId || item.id) === idReal);

    if (existingItem) {
      const updatedCart = currentCart.map(item =>
        (item.productoId || item.id) === idReal
          ? { ...item, cantidad: item.cantidad + quantity }
          : item
      );
      this.cartItems.set(updatedCart);
    } else {
      const newItem = {
        ...product,
        productoId: idReal,
        cantidad: quantity
      };
      this.cartItems.set([...currentCart, newItem]);
    }

    this.saveCart();
  }

  removeFromCart(productId: number) {
    this.cartItems.set(
      this.cartItems().filter(item => {
        const itemId = item.productoId || item.id;
        return itemId !== productId;
      })
    );
    this.saveCart();
  }

  clearCart() {
    this.cartItems.set([]);
    this.saveCart();
  }

  private saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private loadCart() {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  }
}