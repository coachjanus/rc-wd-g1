import { Component, signal } from '@angular/core';
import { Post } from '../../post';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'post-list',
  imports: [DatePipe],
  templateUrl: './post-list.html',
  styleUrl: './post-list.css',
})
export class PostList {
  // Створюємо властивість imageUrl
  // imageUrl: string = 'https://picsum.photos/250';
  // imageUrl: string = 'assets/images/picture.jpg';

  protected readonly title = signal('Мій Технічний Блог');
  protected readonly subtitle = signal('Ділюся досвідом розробки на Angular та не тільки');
  // posts: Post[] = [];
  posts: Post[] = [{
    id: 1,
    title: 'Знайомство з новим Control Flow в Angular',
    excerpt: 'Розбираємося, чому блоки @if та @for назавжди змінили спосіб написання шаблонів в Angular додатках.',
    category: 'Angular',
    date: new Date(2026, 10, 5),
    imageUrl: 'assets/images/picture1.jpg'
  },
  {
    id: 2,
    title: 'Як приручити View Encapsulation та :host стилі',
    excerpt: 'Повний гайд з ізоляції стилів: коли варто використовувати Emulated, а коли None чи ShadowDom.',
    category: 'CSS / Оформлення',
    date: new Date(2026, 10, 1),
    imageUrl: 'assets/images/picture2.jpg'
  },
  {
    id: 3,
    title: 'Оптимізація швидкодії веб-додатків у 2027 році',
    excerpt: 'Корисні поради та практичні кейси для зменшення розміру бандлу та покращення Core Web Vitals.',
    category: 'Performance',
    date: new Date(2026, 9, 28),
    imageUrl: 'https://picsum.photos1/200'
  }
  ];
}
