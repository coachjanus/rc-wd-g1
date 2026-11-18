// src/app/features/blog/pages/post-list/post-list.ts
import { Component, computed, inject, signal } from '@angular/core';
// імпортуємо інтерфейс, він винесений в окремий файл моделей
import { Post } from '../../core/models/post';
import { FormsModule } from '@angular/forms'; // Обов'язково імпортуємо для [(ngModel)]
import { PostCard } from '../../components/post-card/post-card'; // Імпорт дочірнього компонента
import { BlogService } from '../../core/services/blog.service'; // Імпорт сервісу для отримання даних
// Тип для можливих варіантів сортування
type SortOrder = 'latest' | 'oldest';

@Component({
  selector: 'post-list',
  imports: [FormsModule, PostCard], // Додали FormsModule та PostCard
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})


export class PostList {
  private readonly blogService = inject(BlogService);

  isGridView = true;

  readonly allPosts = this.blogService.getPosts();
// 2. Сигнал для збереження поточної обраної категорії ('Всі' за замовчуванням)
  readonly selectedCategory = signal<string>('Всі');

  // 1. Новий сигнал для збереження пошукового запиту
  readonly searchQuery = signal<string>('');

   // 1. Новий сигнал для збереження типу сортування (за замовчуванням: спочатку нові)
  readonly sortBy = signal<SortOrder>('latest');

  readonly categories = computed(() => {
    const unique = new Set(this.allPosts().map(post => post.category));
    return ['Всі', ...Array.from(unique)];
  });

  readonly filteredPosts = computed(() => {
    let posts = this.allPosts();
    
    // Фільтрація за категорією
    const activeCategory = this.selectedCategory();
    if (activeCategory !== 'Всі') {
      posts = posts.filter(post => post.category === activeCategory);
    }
    
    // Фільтрація за текстом
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
  });

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





