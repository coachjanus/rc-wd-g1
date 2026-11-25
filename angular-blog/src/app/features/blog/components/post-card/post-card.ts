import { Component, input } from '@angular/core';
import { Post } from '../../core/models/post';

// Для форматування дати ми перенесемо DatePipe сюди.
import { DatePipe, DecimalPipe, SlicePipe, TitleCasePipe } from '@angular/common';
import { ArticleBadge } from '../article-badge/article-badge';

import { Selected } from '../../../../shared/directives/selected';

import { ReadingTimePipe } from '../../../../shared/pipes/reading-time-pipe';
import { TimeAgoPipe } from "../../../../shared/pipes/time-ago-pipe";

import { TruncatePipe } from '../../../../shared/pipes/truncate-pipe';
@Component({
  selector: 'app-post-card',
  imports: [DatePipe, ArticleBadge, Selected, DecimalPipe, SlicePipe, TitleCasePipe, ReadingTimePipe, TimeAgoPipe, TruncatePipe],
  templateUrl: './post-card.html',
  styleUrl: './post-card.scss',
})
export class PostCard {
  color = "blue";
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
