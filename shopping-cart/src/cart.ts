// src/cart.ts (Управління кошиком)
// Цей модуль імпортує типи та StorageService. Також він експортує змінну cart та функції керування.

import { Product, CartItem, CartStorageItem } from './types';
import { StorageService } from './storage';
export const CART_STORAGE_KEY = 'shopping_cart_state';
export let cart: CartItem[] = [];
const cartContainer = document.getElementById('cartContainer') as HTMLDivElement | null;
const cartTotalHTML = document.getElementById('cartTotal') as HTMLSpanElement | null;
const cartBadgeHTML = document.getElementById('cartBadge') as HTMLSpanElement | null;
export function calculateCartTotal(): number {
  return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
export function calculateCartItemsCount(): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}
export function saveCartToStorage(): void {
  const dataToSave: CartStorageItem[] = cart.map(item => ({
    productId: item.product.id,
    quantity: item.quantity,
  }));
  StorageService.set<CartStorageItem[]>(CART_STORAGE_KEY, dataToSave);
}
export function updateCartInterface(): void {
  if (cartBadgeHTML) cartBadgeHTML.textContent = calculateCartItemsCount().toString();
  if (cartTotalHTML) cartTotalHTML.textContent = `${calculateCartTotal()} грн`;
  if (!cartContainer) return;

  cartContainer.innerHTML = '';
  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Кошик порожній</p>';
    return;
  }

  cart.forEach(item => {
    const itemRow = document.createElement('div');
    itemRow.className = 'cart-item';
    itemRow.innerHTML = `
      <span class="cart-item-name">${item.product.name}</span>
      <div class="cart-item-controls">
        <button class="btn-minus" data-id="${item.product.id}">-</button>
        <span class="cart-item-qty">${item.quantity}</span>
        <button class="btn-plus" data-id="${item.product.id}">+</button>
      </div>
      <span class="cart-item-price">${item.product.price * item.quantity} грн</span>
      <button class="btn-remove" data-id="${item.product.id}">❌</button>
    `;
    cartContainer.appendChild(itemRow);
  });

  initCartListeners();
  saveCartToStorage(); // Автоматичне збереження
}
export function addToCart(product: Product): void {
  const existingItem = cart.find(item => item.product.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ product, quantity: 1 });
  }
  updateCartInterface();
}
export function updateQuantity(productId: number, newQuantity: number): void {
  if (newQuantity <= 0) {
    removeFromCart(productId);
    return;
  }
  const item = cart.find(item => item.product.id === productId);
  if (item) item.quantity = newQuantity;
  updateCartInterface();
}
export function removeFromCart(productId: number): void {
  cart = cart.filter(item => item.product.id !== productId);
  updateCartInterface();
}
export function clearCart(): void {
  cart = [];
  updateCartInterface();
}
function initCartListeners(): void {
  if (!cartContainer) return;
  cartContainer.onclick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const productIdAttr = target.getAttribute('data-id');
    if (!productIdAttr) return;

    const productId = parseInt(productIdAttr);
    const currentItem = cart.find(item => item.product.id === productId);

    if (target.classList.contains('btn-plus') && currentItem) {
      updateQuantity(productId, currentItem.quantity + 1);
    } else if (target.classList.contains('btn-minus') && currentItem) {
      updateQuantity(productId, currentItem.quantity - 1);
    } else if (target.classList.contains('btn-remove')) {
      removeFromCart(productId);
    }
  };
}
// Функція для відновлення кошика (її викликатиме головний файл)

export function restoreCart(savedItems: CartStorageItem[], allProducts: Product[]): void {
cart = [];
savedItems.forEach(savedItem => {
  const matchingProduct = allProducts.find(p => p.id === savedItem.productId);
  if (matchingProduct) {
    cart.push({ product: matchingProduct, quantity: savedItem.quantity });
  }
});
updateCartInterface();
}
