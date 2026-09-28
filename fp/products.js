// 1. Вхідні дані (масив об'єктів)
const products = [
    { id: 1, name: 'Ноутбук', category: 'Електроніка' },
    { id: 2, name: 'Футболка', category: 'Одяг' },
    { id: 3, name: 'Книга "JS для початківців"', category: 'Книги' },
    { id: 4, name: 'Телефон', category: 'Електроніка' },
    { id: 5, name: 'Джинси', category: 'Одяг' },
    { id: 6, name: 'Електронна книга', category: 'Електроніка' },
    { id: 7, name: 'Інша книга', category: 'Книги' },
]

// 2. Пошук DOM-елементів
const container = document.getElementById('productsContainer');
const checkboxes = document.querySelectorAll('.category-checkbox');


// 3. Функція для відображення товарів на сторінці
function renderProducts(items) {
    // Очищуємо контейнер перед новим рендером
    container.innerHTML = '';
    // Якщо нічого не знайдено за фільтрами
    if (items.length === 0) {
        container.innerHTML = '<p>Товарів не знайдено</p>';
        return;
    }

    // Створюємо HTML-картку для кожного об'єкта
    items.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
 <h4>${product.name}</h4>
 <p class="product-category">Категорія: ${product.category}</p>
 `;
        container.appendChild(card);
    });
}

// 4. Головна функція фільтрації
function handleFilter() {
    // Збираємо значення лише тих чекбоксів, які зараз відмічені (checked)
    const activeCategories = Array.from(checkboxes)
        .filter(checkbox => checkbox.checked)
        .map(checkbox => checkbox.value);
    // Логіка фільтрації:
    // Якщо жоден чекбокс не вибрано — показуємо ВСІ товари.
    // Якщо вибрано — залишаємо лише ті товари, чия категорія є в масиві activeCategories.
    const filteredProducts = products.filter(product => {
        if (activeCategories.length === 0) return true;
        return activeCategories.includes(product.category);
    });
    // Перемальовуємо інтерфейс з відфільтрованими даними
    renderProducts(filteredProducts);
}

// 5. Навішуємо слухач подій на кожен чекбокс
checkboxes.forEach(checkbox => {
 checkbox.addEventListener('change', handleFilter);
});

// Первинний запуск програми, щоб відобразити всі товари під час завантаження сторінки
renderProducts(products);