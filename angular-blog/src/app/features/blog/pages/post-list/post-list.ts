import { Component, signal, computed, inject } from '@angular/core';
// import { Post } from '../../core/models/post';

import { FormsModule } from '@angular/forms'; // Обов'язково імпортуємо для [(ngModel)]
import { PostCard } from '../../components/post-card/post-card'; // Імпорт дочірнього компонента
// Тип для можливих варіантів сортування

import { BlogService } from '../../core/services/blog.service'; // Імпорт сервісу для отримання даних
type SortOrder = 'latest' | 'oldest';


@Component({
  selector: 'post-list',
  imports: [PostCard, FormsModule],
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})
export class PostList {
  private readonly blogService = inject(BlogService);

  isGridView = true;

  readonly allPosts = this.blogService.getPosts();
  protected readonly title = signal('Мій Технічний Блог');
  protected readonly subtitle = signal('Ділюся досвідом розробки на Angular та не тільки');

  

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

  toggleViewMode(): void {
    this.isGridView = !this.isGridView;
  }


}
