// 1. Глобальні змінні стану додатка
let products = []; // Порожній масив, сюди запишуться дані після fetch
let currentPage = 1;
const itemsPerPage = 7; // Скільки товарів виводити на одній сторінці

// 2. DOM Елементи
const container = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const checkboxes = document.querySelectorAll('.category-checkbox');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const sortSelect = document.getElementById('sortSelect');
const clearFiltersBtn = document.getElementById('clearFiltersBtn');
const paginationContainer = document.getElementById('paginationContainer');
const totalProductsCountHTML = document.getElementById('totalProductsCount');

// Динамічний підрахунок кількості товарів (Бейджі)
function updateBadges(searchQuery, minPrice, maxPrice) {
    const baseFiltered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesSearch && matchesPrice;
    });
    // Оновлюємо бейджі відповідно до нових категорій з сервера
    const categories = ['beauty', 'fragrances', 'groceries'];
    categories.forEach(cat => {
        const badge = document.getElementById(`count-${cat}`);
        if (badge) {
            const count = baseFiltered.filter(p => p.category === cat).length;
            badge.textContent = count;
        }
    });
}

// Рендер кнопок пагінації
function renderPagination(totalItems) {
    paginationContainer.innerHTML = '';
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return;
    const prevBtn = document.createElement('button');
    prevBtn.className = 'page-btn';
    prevBtn.textContent = '«';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => { currentPage--; updateInterface(false); });
    paginationContainer.appendChild(prevBtn);
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
        pageBtn.textContent = i;
        pageBtn.addEventListener('click', () => { currentPage = i; updateInterface(false); });
        paginationContainer.appendChild(pageBtn);
    }
    const nextBtn = document.createElement('button');
    nextBtn.className = 'page-btn';
    nextBtn.textContent = '»';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => { currentPage++; updateInterface(false); });
    paginationContainer.appendChild(nextBtn);
}

// Рендер карток товарів
function renderProducts(items) {
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
 `;
        container.appendChild(card);
    });
}

// Функція автоматичного очищення фільтрів
function clearFilters() {
    searchInput.value = '';
    priceMinInput.value = '';
    priceMaxInput.value = '';
    sortSelect.value = 'default';
    checkboxes.forEach(cb => cb.checked = false);
    window.history.replaceState(null, '', window.location.pathname);
    updateInterface(true);
}

// Головна функція оновлення інтерфейсу
function updateInterface(resetPage = true) {
    // Якщо дані ще не завантажилися з сервера, зупиняємо виконання
    if (products.length === 0) return;
    if (resetPage) currentPage = 1;
    const searchQuery = searchInput.value.toLowerCase().trim();
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
    const sortType = sortSelect.value;
    const activeCategories = Array.from(checkboxes).filter(cb => cb.checked).map(cb => cb.value);
    syncFiltersToURL(searchInput.value.trim(), minPrice, maxPrice, sortType, activeCategories);
    updateBadges(searchQuery, minPrice, maxPrice);
    let filtered = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        const matchesCategory = activeCategories.length === 0 ||
            activeCategories.includes(product.category);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        return matchesSearch && matchesCategory && matchesPrice;
    });
    totalProductsCountHTML.textContent = filtered.length;
    if (sortType === 'price-asc') filtered.sort((a, b) => a.price - b.price);
    else if (sortType === 'price-desc') filtered.sort((a, b) => b.price - a.price);
    else if (sortType === 'name-asc') filtered.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = filtered.slice(startIndex, endIndex);
    renderProducts(paginatedItems);
    renderPagination(filtered.length);
}

// Слухачі подій
searchInput.addEventListener('input', () => updateInterface(true));
priceMinInput.addEventListener('input', () => updateInterface(true));
priceMaxInput.addEventListener('input', () => updateInterface(true));
sortSelect.addEventListener('change', () => updateInterface(true));
checkboxes.forEach(cb => cb.addEventListener('change', () => updateInterface(true)));
clearFiltersBtn.addEventListener('click', clearFilters);

// 3. АСИНХРОННА ФУНКЦІЯ ЗАВАНТАЖЕННЯ ДАНИХ (FETCH)
async function fetchProducts() {
    try {
        // Показуємо користувачу індикатор завантаження
        container.innerHTML = '<p style="grid-column: 1/-1; text-align: center;">Завантаження товарів...</p > ';
        // Запитуємо дані з сервера (ліміт 30 товарів для тесту)
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
            throw new Error(`Помилка HTTP: ${response.status}`);
        }
        const data = await response.json();
        // МАТРИЦЯ ТРАНСФОРМАЦІЇ: Приводимо серверні дані до нашого формату
        // DummyJSON має поля: title, category, price, id
        products = data.products.map(item => ({
            id: item.id,
            name: item.title,
            category: item.category, // beauty, fragrances, groceries тощо
            price: Math.round(item.price * 41) // Конвертуємо умовні долари в грн для реалістичності
        }));
        // Після успішного завантаження запускаємо логіку інтерфейсу
        loadFiltersFromURL();
        updateInterface(false);
    } catch (error) {
        console.error("Не вдалося завантажити дані:", error);
        container.innerHTML = `<p style="color: red; grid-column: 1/-1;">Сталася помилка при завантаженні товарів: ${error.message}</p>`;
    }
}

// Функція завантаження стану фільтрів з URL
function loadFiltersFromURL() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('search')) searchInput.value = params.get('search');
    if (params.has('minPrice')) priceMinInput.value = params.get('minPrice');
    if (params.has('maxPrice')) priceMaxInput.value = params.get('maxPrice');
    if (params.has('sort')) sortSelect.value = params.get('sort');
    if (params.has('page')) currentPage = parseInt(params.get('page')) || 1;
    if (params.has('categories')) {
        const activeCats = params.get('categories').split(',');
        checkboxes.forEach(cb => {
            if (activeCats.includes(cb.value)) cb.checked = true;
        });
    }
}

// Функція синхронізації стану з URL
function syncFiltersToURL(searchQuery, minPrice, maxPrice, sortType, activeCategories) {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (minPrice > 0) params.set('minPrice', minPrice);
    if (maxPrice && maxPrice !== Infinity) params.set('maxPrice', maxPrice);
    if (sortType !== 'default') params.set('sort', sortType);
    if (currentPage > 1) params.set('page', currentPage);
    if (activeCategories.length > 0) params.set('categories', activeCategories.join(','));
    const newRelativePathQuery = window.location.pathname + (params.toString() ? '?' + params.toString()
        : '');
    window.history.replaceState(null, '', newRelativePathQuery);
}

// --- СТАРТ ПРОГРАМИ ---
// Замість миттєвого виклику updateInterface, спочатку ініціюємо fetch-запит до API
fetchProducts();