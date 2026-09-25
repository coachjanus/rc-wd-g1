
class Slider {
    constructor(containerSelector) {
        // 1. Знаходимо головний контейнер та його внутрішні елементи
        this.container = document.querySelector(containerSelector);
        if (!this.container) return;
        this.mainPhoto = this.container.querySelector('.main-photo');
        this.thumbnails = this.container.querySelectorAll('.thumb');
        // console.log(this.thumbnails);
        this.prevBtn = this.container.querySelector('.prev-btn');
        this.nextBtn = this.container.querySelector('.next-btn');
        this.thumbnailsContainer = this.container.querySelector('.thumbnails-list');

        // 2. Внутрішній стан (State)
        this.currentIndex = 0;
        // 3. Запуск ініціалізації подій
        this.initEvents();
    }

    // Навігація вперед
    next() {
        this.currentIndex = (this.currentIndex + 1) % this.thumbnails.length;
        this.updateGallery(this.currentIndex);
    }
    // Навігація назад
    prev() {
        this.currentIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
        this.updateGallery(this.currentIndex);
    }



    // Метод для оновлення фото та стану активності
    updateGallery(index) {
        this.mainPhoto.style.opacity = '0';
        setTimeout(() => {
            const activeThumb = this.thumbnails[index];
            this.mainPhoto.src = activeThumb.getAttribute('data-large');
            // Перемикання класів active
            this.thumbnails.forEach(t => t.classList.remove('active'));
            activeThumb.classList.add('active');
            this.mainPhoto.style.opacity = '1';
        }, 150);
    }


    // Ініціалізація всіх слухачів подій всередині компонента
    initEvents() {
        // Кнопки навігації
        this.nextBtn.addEventListener('click', () => this.next());
        this.prevBtn.addEventListener('click', () => this.prev());
        // Делегація подій для мініатюр
        this.thumbnailsContainer.addEventListener('click', (event) => {
            if (event.target.classList.contains('thumb')) {
                this.currentIndex = Number(event.target.getAttribute('data-index'));
                this.updateGallery(this.currentIndex);
            }
        });

        // Глобальне керування клавіатурою (реагує лише якщо фокус не в інпутах)
        document.addEventListener('keydown', (event) => {
            const activeTag = document.activeElement.tagName;
            if (activeTag === 'INPUT' || activeTag === 'TEXTAREA') return;
            if (event.key === 'ArrowRight') this.next();
            if (event.key === 'ArrowLeft') this.prev();
        });
    }
    
}

// =======================================================
// ВИКЛИК ТА ЗАПУСК КОМПОНЕНТА
// =======================================================
// Передаємо у конструктор унікальний селектор нашої галереї
const slider = new Slider('#main-gallery');