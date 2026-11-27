import { Injectable, signal } from '@angular/core';
import { Post, MOCK_POSTS } from '../../features/blog/core/models/post';
import { of, delay, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // Внутрішній приватний сигнал для збереження статей, який може змінювати тільки сам сервіс
  private readonly _posts = signal<Post[]>([]);

  private dbPosts: Post[] = [...MOCK_POSTS];
  private loadingSignal = signal<boolean>(false);
  readonly isLoading = this.loadingSignal.asReadonly();

  // Внутрішній приватний сигнал для збереження статей, який може змінювати тільки сам сервіс
  private postsSignal = signal<Post[]>([]);

  // Публічний сигнал тільки для читання
  readonly posts = this.postsSignal.asReadonly();

  // Сигнал для одного конкретного допису
  private selectedPostSignal = signal<Post | null>(null);

  readonly selectedPost = this.selectedPostSignal.asReadonly();

  // Сигнал помилки (наприклад, 404 Не знайдено)
  private errorSignal = signal<string | null>(null);
  readonly error = this.errorSignal.asReadonly();


  // Отримання всіх дописів (імітація GET-запиту)
  loadPosts() {
    this.loadingSignal.set(true);
    of(this.dbPosts)
      .pipe(
        delay(100), // Імітація затримки мережі .1 сек
        finalize(() => this.loadingSignal.set(false))
      )
      .subscribe((posts) => {
        this.postsSignal.set(posts);
      });
  }

  loadPostById(id: number) { // Метод отримання допису за ID
    this.loadingSignal.set(true);
    this.errorSignal.set(null);
    this.selectedPostSignal.set(null); // Очищаємо попередній допис перед новим запитом
    const foundPost = this.dbPosts.find(post => post.id === id) || null; // Шукаємо допис у нашому масиві
    of(foundPost)
      .pipe(
        delay(800), // Імітуємо затримку запиту
        finalize(() => this.loadingSignal.set(false))
      )
      .subscribe((post) => {
        if (post) {
          this.selectedPostSignal.set(post);
        } else {
          this.errorSignal.set(`Допис з ідентифікатором #${id} не знайдено.`);
        }
      });
  }


  addPost(newPost: Post) {
    this._posts.update(_posts => [..._posts, newPost]);
  }

}
