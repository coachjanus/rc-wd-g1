// 1. Розширений масив об'єктів (додано поле price)
const products = [
    { id: 1, name: 'Ноутбук Lenovo', category: 'Електроніка', price: 25000 },
    { id: 2, name: 'Футболка літня', category: 'Одяг', price: 450 },
    { id: 3, name: 'Книга "JS для початківців"', category: 'Книги', price: 350 },
    { id: 4, name: 'Телефон Samsung', category: 'Електроніка', price: 12000 },
    { id: 5, name: 'Джинси класичні', category: 'Одяг', price: 1200 },
    { id: 6, name: 'Електронна книга PocketBook', category: 'Електроніка', price: 4500 },
    { id: 7, name: 'Книга "Алгоритми"', category: 'Книги', price: 600 }
];

// 2. DOM Елементи
const container = document.getElementById('productsContainer');
const searchInput = document.getElementById('searchInput');
const checkboxes = document.querySelectorAll('.category-checkbox');
const priceMinInput = document.getElementById('priceMin');
const priceMaxInput = document.getElementById('priceMax');
const sortSelect = document.getElementById('sortSelect');

// 3. Функція рендеру карток у DOM
function renderProducts(items) {
    container.innerHTML = '';
    if (items.length === 0) {
        container.innerHTML = '<p>Товарів не знайдено за вказаними фільтрами.</p>';
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

// 4. Головна комбінована функція: Фільтрація + Сортування
function updateInterface() {
    // --- Крок A: Отримання поточних значень з DOM ---
    const searchQuery = searchInput.value.toLowerCase().trim();
    const activeCategories = Array.from(checkboxes)
        .filter(cb => cb.checked)
        .map(cb => cb.value);
    const minPrice = parseFloat(priceMinInput.value) || 0;
    const maxPrice = parseFloat(priceMaxInput.value) || Infinity;
    const sortType = sortSelect.value;
    // --- Крок B: Послідовна фільтрація масиву ---
    let result = products.filter(product => {
        // 1. Фільтр за назвою (регістронезалежний)
        const matchesSearch = product.name.toLowerCase().includes(searchQuery);
        // 2. Фільтр за категоріями
        const matchesCategory = activeCategories.length === 0 || activeCategories.includes(product.category);
        // 3. Фільтр за ціновим діапазоном
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        // Елемент залишається, лише якщо пройшов ВСІ 3 перевірки
        return matchesSearch && matchesCategory && matchesPrice;
    });
    // --- Крок C: Сортування результату ---
    if (sortType === 'price-asc') {
        result.sort((a, b) => a.price - b.price);
    } else if (sortType === 'price-desc') {
        result.sort((a, b) => b.price - a.price);
    } else if (sortType === 'name-asc') {
        result.sort((a, b) => a.name.localeCompare(b.name, 'uk'));
    }
    // --- Крок D: Виведення результату ---
    renderProducts(result);
}

// 5. Прив'язка подій (Event Listeners)
searchInput.addEventListener('input', updateInterface);
priceMinInput.addEventListener('input', updateInterface);
priceMaxInput.addEventListener('input', updateInterface);
sortSelect.addEventListener('change', updateInterface);
checkboxes.forEach(cb => {
 cb.addEventListener('change', updateInterface);
});
// Перший запуск для показу всіх товарів
updateInterface();