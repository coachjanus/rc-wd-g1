var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { StorageService } from './storage.js';
import { addToCart, cart, calculateCartTotal, clearCart, restoreCart, CART_STORAGE_KEY } from './cart.js';
import { validateOrderForm } from './validation.js';
let products = []; // Глобальний стан каталогу
let currentPage = 1;
const itemsPerPage = 3;
const container = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const checkboxes = document.querySelectorAll('.category-checkbox');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const sortSelect = document.getElementById('sortSelect');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const paginationContainer = document.getElementById('paginationContainer');
const totalProductsCountHTML = document.getElementById('totalProductsCount');
// Елементи форми замовлення
const orderForm = document.getElementById('orderForm');
const nameInput = document.getElementById('orderName');
const phoneInput = document.getElementById('orderPhone');
const emailInput = document.getElementById('orderEmail');
const addressInput = document.getElementById('orderAddress');
const paymentSelect = document.getElementById('orderPayment');
const nameErrorHTML = document.getElementById('nameError');
const phoneErrorHTML = document.getElementById('phoneError');
const emailErrorHTML = document.getElementById('emailError');
const addressErrorHTML = document.getElementById('addressError');
function fetchProducts() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (container)
                container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Завантаження...</p>';
            const response = yield fetch('https://dummyjson.com/products');
            if (!response.ok)
                throw new Error(`Помилка HTTP: ${response.status}`);
            const data = yield response.json();
            products = data.products.map((item) => ({
                id: item.id, name: item.title, category: item.category, price: Math.round(item.price * 41)
            }));
            loadFiltersFromURL();
            // Відновлюємо кошик із LocalStorage після отримання продуктів
            const savedCartData = StorageService.get(CART_STORAGE_KEY, []);
            restoreCart(savedCartData, products);
            updateInterface(false);
        }
        catch (error) {
            if (container) {
                container.innerHTML = `<p style="color: red; grid-column: 1/-1;">Помилка: ${error instanceof Error ?
                    error.message : 'Невідома'}</p>`;
            }
        }
    });
}
function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('search') && searchInput)
        searchInput.value = params.get('search') || '';
    if (params.has('minPrice') && priceMinInput)
        priceMinInput.value = params.get('minPrice') || '';
    if (params.has('maxPrice') && priceMaxInput)
        priceMaxInput.value = params.get('maxPrice') || '';
    if (params.has('sort') && sortSelect)
        sortSelect.value = params.get('sort') || 'default';
    if (params.has('page'))
        currentPage = parseInt(params.get('page') || '1') || 1;
    if (params.has('categories')) {
        const activeCats = (params.get('categories') || '').split(',');
        checkboxes.forEach(cb => { if (activeCats.indexOf(cb.value) !== -1)
            cb.checked = true; });
    }
}
function syncFiltersToURL(search, min, max, sort, cats) {
    const params = new URLSearchParams();
    if (search)
        params.set('search', search);
    if (min > 0)
        params.set('minPrice', min.toString());
    if (max && max !== Infinity)
        params.set('maxPrice', max.toString());
    if (sort !== 'default')
        params.set('sort', sort);
    if (currentPage > 1)
        params.set('page', currentPage.toString());
    if (cats.length > 0)
        params.set('categories', cats.join(','));
    window.history.replaceState(null, '', window.location.pathname + (params.toString() ? '?' +
        params.toString() : ''));
}
function renderProducts(items) {
    if (!container)
        return;
    container.innerHTML = '';
    if (items.length === 0) {
        container.innerHTML = '<p style="grid-column: 1/-1;">Товарів не знайдено.</p>';
        return;
    }
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
 <h4>${product.name}</h4>
 <p class="product-price">${product.price} грн</p>
 <p class="product-category">Категорія: ${product.category}</p>
 <button class="btn-add-to-cart" data-id="${product.id}">Купити</button>
 `;
        container.appendChild(card);
    });
}
function renderPagination(totalItems) {
    if (!paginationContainer)
        return;
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1)
        return;
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i.toString();
        pageBtn.addEventListener('click', () => { currentPage = i; updateInterface(false); });
        paginationContainer.appendChild(pageBtn);
    }
}
function updateInterface(resetPage = true) {
    if (products.length === 0)
        return;
    if (resetPage)
        currentPage = 1;
    const searchQuery = searchInput ? searchInput.value.toLowerCase().trim() : '';
    const minPrice = priceMinInput ? (parseFloat(priceMinInput.value) || 0) : 0;
    const maxPrice = priceMaxInput ? (parseFloat(priceMaxInput.value) || Infinity) : Infinity;
    const sortType = sortSelect ? sortSelect.value : 'default';
    const activeCategories = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    syncFiltersToURL(searchInput ? searchInput.value.trim() : '', minPrice, maxPrice, sortType, activeCategories);
    let filtered = products.filter(product => {
        return product.name.toLowerCase().includes(searchQuery) &&
            (activeCategories.length === 0 || activeCategories.indexOf(product.category) !== -1) &&
            product.price >= minPrice && product.price <= maxPrice;
    });
    if (totalProductsCountHTML)
        totalProductsCountHTML.textContent = filtered.length.toString();
    if (sortType === 'price-asc')
        filtered.sort((a, b) => a.price - b.price);
    else if (sortType === 'price-desc')
        filtered.sort((a, b) => b.price - a.price);
    const startIndex = (currentPage - 1) * itemsPerPage;
    renderProducts(filtered.slice(startIndex, startIndex + itemsPerPage));
    renderPagination(filtered.length);
}
// --- СЛУХАЧІ ПОДІЙ ---
function initEventListeners() {
    searchInput === null || searchInput === void 0 ? void 0 : searchInput.addEventListener('input', () => updateInterface(true));
    sortSelect === null || sortSelect === void 0 ? void 0 : sortSelect.addEventListener('change', () => updateInterface(false));
    priceMinInput === null || priceMinInput === void 0 ? void 0 : priceMinInput.addEventListener('input', () => updateInterface(true));
    priceMaxInput === null || priceMaxInput === void 0 ? void 0 : priceMaxInput.addEventListener('input', () => updateInterface(true));
    checkboxes.forEach(cb => cb.addEventListener('change', () => updateInterface(true)));
    clearFiltersBtn === null || clearFiltersBtn === void 0 ? void 0 : clearFiltersBtn.addEventListener('click', () => {
        if (searchInput)
            searchInput.value = '';
        if (priceMinInput)
            priceMinInput.value = '';
        if (priceMaxInput)
            priceMaxInput.value = '';
        if (sortSelect)
            sortSelect.value = 'default';
        checkboxes.forEach(cb => cb.checked = false);
        updateInterface(true);
    });
    // Кліки по кнопках "Купити"
    container === null || container === void 0 ? void 0 : container.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('btn-add-to-cart')) {
            const productId = parseInt(target.getAttribute('data-id') || '0');
            const productToBuy = products.find(p => p.id === productId);
            if (productToBuy)
                addToCart(productToBuy);
        }
    });
    // Сабміт форми замовлення
    orderForm === null || orderForm === void 0 ? void 0 : orderForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (cart.length === 0) {
            alert("Кошик порожній!");
            return;
        }
        const formData = {
            fullName: nameInput ? nameInput.value : '',
            phone: phoneInput ? phoneInput.value : '',
            email: emailInput ? emailInput.value : '',
            address: addressInput ? addressInput.value : '',
            paymentMethod: (paymentSelect ? paymentSelect.value : 'card')
        };
        const validationErrors = validateOrderForm(formData);
        if (nameErrorHTML)
            nameErrorHTML.textContent = validationErrors.fullName || '';
        if (phoneErrorHTML)
            phoneErrorHTML.textContent = validationErrors.phone || '';
        if (emailErrorHTML)
            emailErrorHTML.textContent = validationErrors.email || '';
        if (addressErrorHTML)
            addressErrorHTML.textContent = validationErrors.address || '';
        if (Object.keys(validationErrors).length > 0)
            return;
        alert(`Дякуємо, ${formData.fullName}! Замовлення на суму ${calculateCartTotal()} грн прийнято.`);
        orderForm.reset();
        clearCart();
    });
}
// Запуск проєкту
initEventListeners();
fetchProducts();
