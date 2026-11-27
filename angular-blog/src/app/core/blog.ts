import { Injectable, signal } from '@angular/core';
import { Post } from '../features/blog/core/models/post';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  // Внутрішній приватний сигнал для збереження статей, який може змінювати тільки сам сервіс
  private readonly _posts = signal<Post[]>([]);

  // Публічний сигнал тільки для читання
  readonly posts = this._posts.asReadonly();

  addPost(newPost: Post) {
    this._posts.update(_posts => [..._posts, newPost]);
  }

  
}
