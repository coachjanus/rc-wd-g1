import { Component, signal, computed } from '@angular/core';
import { Post } from '../../post';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms'; // Обов'язково імпортуємо для [(ngModel)]

// Тип для можливих варіантів сортування
type SortOrder = 'latest' | 'oldest';


@Component({
  selector: 'post-list',
  imports: [DatePipe, FormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  protected readonly title = signal('Мій Технічний Блог');
  protected readonly subtitle = signal('Ділюся досвідом розробки на Angular та не тільки');

  // Початковий масив статей (загорнутий у Сигнал)
  readonly allPosts = signal<Post[]>([
    {
      id: 1,
      title: 'Знайомство з новим Control Flow в Angular',
      excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
      category: 'Angular',
      date: new Date(2026, 10, 5),
      imageUrl: 'assets/images/picture1.jpg',
    },
    {
      id: 2,
      title: 'Як приручити View Encapsulation та :host стилі',
      excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
      category: 'CSS / Оформлення',
      date: new Date(2026, 10, 1),
      imageUrl: 'assets/images/picture2.jpg',
    },
    {
      id: 3,
      title: 'Оптимізація швидкодії веб-додатків у 2027 році',
      excerpt: 'Корисні поради та практичні кейси для зменшення розміру бандлу та покращення Core Web Vitals.',
      category: 'Performance',
      date: new Date(2026, 9, 28),
      imageUrl: 'https://picsum.photos1/200',
    },
    {
      id: 4,
      title: 'Автоматично згенерований список унікальних категорій',
      excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
      category: 'Performance',
      date: new Date(2026, 10, 12),
      imageUrl: 'assets/images/picture.jpg',
    },
    {
      id: 5,
      title: 'Control Flow в Angular',
      excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
      category: 'Angular',
      date: new Date(2026, 10, 4),
      imageUrl: 'assets/images/picture1.jpg',
    },
  ]);

  // Сигнал для збереження поточної обраної категорії ('Всі' за замовчуванням)
  readonly selectedCategory = signal<string>('Всі');

  // Новий сигнал для збереження пошукового запиту
  readonly searchQuery = signal<string>('');

  // Новий сигнал для збереження типу сортування (за замовчуванням: спочатку нові)
  readonly sortBy = signal<SortOrder>('latest');

  // Автоматично згенерований список унікальних категорій для кнопок-фільтрів
  readonly categories = computed(() => {
    const unique = new Set(this.allPosts().map(post => post.category));
    return ['Всі', ...Array.from(unique)];
  });
  // Обчислюваний (computed) сигнал для відфільтрованих статей
  readonly filteredPosts = computed(() => {
    let posts = this.allPosts();
    const activeCategory = this.selectedCategory();
    if (activeCategory !== 'Всі') {
      posts = posts.filter(post => post.category === activeCategory);
    }
    // Фільтрація за текстом (пошук)
    const query = this.searchQuery().toLowerCase().trim();
    if (query) {
      posts = posts.filter(post =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query)
      );
    }
    // Сортування за датою (.slice() потрібен, щоб не мутувати оригінальний сигнал)
    const order = this.sortBy();
    return posts.slice().sort((a, b) => {
      const timeA = a.date.getTime();
      const timeB = b.date.getTime();
      return order === 'latest' ? timeB - timeA : timeA - timeB;
    });
    // return posts;
  });

  // Метод для зміни фільтра
  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  // Метод для зміни сортування
  setSortOrder(order: SortOrder): void {
    this.sortBy.set(order);
  }


}
