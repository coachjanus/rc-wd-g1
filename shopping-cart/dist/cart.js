// Цей модуль імпортує типи та StorageService. Також він експортує змінну cart та функції керування.
import { StorageService } from './storage.js';
export const CART_STORAGE_KEY = 'shopping_cart_state';
export let cart = [];
const cartContainer = document.getElementById('cartContainer');
const cartTotalHTML = document.getElementById('cartTotal');
const cartBadgeHTML = document.getElementById('cartBadge');
export function calculateCartTotal() {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
}
export function calculateCartItemsCount() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}
export function saveCartToStorage() {
    const dataToSave = cart.map(item => ({
        productId: item.product.id,
        quantity: item.quantity,
    }));
    StorageService.set(CART_STORAGE_KEY, dataToSave);
}
export function updateCartInterface() {
    if (cartBadgeHTML)
        cartBadgeHTML.textContent = calculateCartItemsCount().toString();
    if (cartTotalHTML)
        cartTotalHTML.textContent = `${calculateCartTotal()} грн`;
    if (!cartContainer)
        return;
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
 <button class="btn-remove" data-id="${item.product.id}"> </button>
 `;
        cartContainer.appendChild(itemRow);
    });
    initCartListeners();
    saveCartToStorage(); // Автоматичне збереження
}
export function addToCart(product) {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
        existingItem.quantity +=
            1;
    }
    else {
        cart.push({
            product, quantity: 1
        });
    }
    updateCartInterface();
}
export function updateQuantity(productId, newQuantity) {
    if (newQuantity <=
        0) {
        removeFromCart(productId);
        return;
    }
    const item = cart.find(item => item.product.id === productId);
    if (item)
        item.quantity = newQuantity;
    updateCartInterface();
}
function initCartListeners() {
    if (!cartContainer)
        return;
    cartContainer.onclick = (event) => {
        const target = event.target;
        const productIdAttr = target.getAttribute('data-id');
        if (!productIdAttr)
            return;
        const productId = parseInt(productIdAttr);
        const currentItem = cart.find(item => item.product.id === productId);
        if (target.classList.contains('btn-plus') && currentItem) {
            updateQuantity(productId, currentItem.quantity +
                1);
        }
        else if (target.classList.contains('btn-minus') && currentItem) {
            updateQuantity(productId, currentItem.quantity -
                1);
        }
        else if (target.classList.contains('btn-remove')) {
            removeFromCart(productId);
        }
    };
}
export function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    updateCartInterface();
}
export function clearCart() {
    cart = [];
    updateCartInterface();
}
// Функція для відновлення кошика (її викликатиме головний файл)
export function restoreCart(savedItems, allProducts) {
    cart = [];
    savedItems.forEach(savedItem => {
        const matchingProduct = allProducts.find(p => p.id === savedItem.productId);
        if (matchingProduct) {
            cart.push({ product: matchingProduct, quantity: savedItem.quantity });
        }
    });
    updateCartInterface();
}
