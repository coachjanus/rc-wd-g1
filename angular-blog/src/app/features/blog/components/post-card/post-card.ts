import { Component, input } from '@angular/core';
import { Post } from '../../core/models/post';

// Для форматування дати ми перенесемо DatePipe сюди.
import { DatePipe } from '@angular/common';
import { ArticleBadge } from '../article-badge/article-badge';

@Component({
  selector: 'app-post-card',
  imports: [DatePipe, ArticleBadge],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {

  // 1. Обов'язковий параметр (гарантує, що батьківський компонент передасть значення)
  // title = input.required<string>();
  // 2. Необов'язковий параметр зі значенням за замовчуванням
  limit = input<number>(3);
  // 3. Необов'язковий параметр без початкового значення (тип: InputSignal<string | undefined>)
  subtitle = input<string>();
  // Використовуємо сучасний Signal Input. Кваліфікатор .required() гарантує,
  // що батьківський компонент обов'язково має передати об'єкт статті.
  post = input.required<Post>();
}
