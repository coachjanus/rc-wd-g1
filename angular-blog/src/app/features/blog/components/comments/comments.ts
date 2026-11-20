import { Component, input, signal, effect } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CommentItem } from '../../core/models/comment';

@Component({
  selector: 'app-comments',
  imports: [FormsModule, CommonModule],
  templateUrl: './comments.html',
  styleUrl: './comments.scss',
})
export class Comments {
  // Отримуємо ID статті від батьківського компонента PostDetailComponent
  postId = input.required<string>();
  comments = signal<CommentItem[]>([]);
  authorName = signal<string>('');
  commentText = signal<string>('');

  constructor() {
    // Автоматично завантажуємо коментарі при зміні postId
    effect(() => {
      const currentPostId = this.postId();
      this.loadComments(currentPostId);
    });
  }

  private loadComments(postId: string): void {
    const saved = localStorage.getItem('blog_comments');
    const allComments: CommentItem[] = saved ? JSON.parse(saved) : [];
    const postComments = allComments.filter(c => c.postId === postId);
    this.comments.set(postComments);
  }

  addComment(): void {
    const author = this.authorName().trim();
    const text = this.commentText().trim();
    if (!author || !text) {
      return;
    }

    const newComment: CommentItem = {
      id: Date.now().toString(),
      postId: this.postId(),
      author,
      text,
      createdAt: new Date().toISOString()
    };

    // Оновлюємо список на екрані
    this.comments.update(list => [newComment, ...list]);

    // Зберігаємо у localStorage (імітація бази даних)
    const saved = localStorage.getItem('blog_comments');
    const allComments: CommentItem[] = saved ? JSON.parse(saved) : [];
    localStorage.setItem('blog_comments', JSON.stringify([newComment, ...allComments]));
    // Очищаємо поля форми
    this.authorName.set('');
    this.commentText.set('');
  }
}
