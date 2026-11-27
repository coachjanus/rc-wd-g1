// src/app/features/blog/pages/post-list/post-list.ts
import { Component, computed, inject, signal, effect   } from '@angular/core';

import { FormsModule } from '@angular/forms'; // Обов'язково імпортуємо для [(ngModel)]
import { PostCard } from '../../components/post-card/post-card'; // Імпорт дочірнього компонента
import { BlogService } from '../../../../core/services/blog'; // Імпорт сервісу для отримання даних

import { BlogFilter, SortOrder } from '../../components/blog-filter/blog-filter';


@Component({
  selector: 'post-list',
  imports: [FormsModule, PostCard, BlogFilter], // Додали FormsModule та PostCard
  templateUrl: './post-list.html',
  styleUrl: './post-list.scss',
})


export class PostList {

  // 1. Інжектуємо наш сервіс за допомогою сучасної функції inject()
  readonly blogService = inject(BlogService);
  // 2. Прокидаємо сигнал завантаження в шаблон
  readonly isLoading = this.blogService.isLoading;

  // Усі стани фільтрації тепер є сигналами
  readonly isGridView = signal<boolean>(true);
  readonly selectedCategory = signal<string>('Всі');
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<SortOrder>('latest');
  readonly itemsToShow = signal<number>(2);

  // isGridView = true;
  parentCount = signal(10); // Початкове значення

  constructor() {
    // Ефект автоматично скидає пагінацію при зміні пошуку чи категорії
    effect(() => {
      this.searchQuery();
      this.selectedCategory();
      this.itemsToShow.set(2);
    }, { allowSignalWrites: true });
  }

 
  readonly categories = computed(() => {
    const unique = new Set(this.blogService.posts().map(post => post.category));
    return ['Всі', ...Array.from(unique)];
  });


  readonly filteredPosts = computed(() => {
    // let posts = this.allPosts();
    let posts = this.blogService.posts();

    
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


  // 5. Ініціюємо завантаження даних при старті компонента
  ngOnInit(): void {
    this.blogService.loadPosts();
  }

}
