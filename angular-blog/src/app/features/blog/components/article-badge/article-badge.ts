import { ChangeDetectionStrategy, input, computed, booleanAttribute, Component } from '@angular/core';


export type BadgeType = 'new' | 'featured' | 'popular';

@Component({
  selector: 'app-article-badge',
  imports: [],
  template: `
    @if (shouldShow()) {
    <span class="article-badge" [class]="badgeConfig().cssClass">
    <span class="badge-icon">{{ badgeConfig().icon }}</span>
    <span class="badge-text">{{ badgeConfig().label }}</span>
    </span>
    }
    `,
  styleUrl: './article-badge.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleBadge {

  // Тип бейджа
  type = input<BadgeType>('new');
  // Дозволяє передавати власний текст замість стандартного
  customLabel = input<string>('');
  // Булевий атрибут для швидкого увімкнення без прив'язки [isFeatured]="true"
  isFeatured = input(false, { transform: booleanAttribute });
  // Дата публікації статті (для автоматичного визначення, чи стаття свіжа)
  // Приймає як рядок ('2026-11-15'), так і об'єкт Date
  publishedDate = input<string | Date>();

  // Обчислюваний сигнал для визначення, чи стаття свіжа (опублікована протягом останніх 7 днів)
  // private readonly isNew = computed(() => {
  //   if (!this.publishedDate()) return false;
  //   const published = new Date(this.publishedDate());
  //   const now = new Date();
  //   const diffInDays = (now.getTime() - published.getTime()) / (1000 * 60 * 60 * 24);
  //   return diffInDays <= 7;
  // })

  private isRecent = computed(() => {
    const rawDate = this.publishedDate();
    if (!rawDate) return false;
    // Якщо передано об'єкт Date - беремо getTime(), якщо рядок - парсимо через new Date()
    const postTime = rawDate instanceof Date
      ? rawDate.getTime()
      : new Date(rawDate).getTime();
    if (Number.isNaN(postTime)) return false;
    // Перевіряє, чи стаття опублікована протягом останніх 7 днів
    const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
    return Date.now() - postTime <= sevenDaysMs;
  });
  // Визначає, чи потрібно показувати бейдж на екрані
  shouldShow = computed(() => {
    if (this.isFeatured()) return true;
    if (this.type() === 'new' && this.publishedDate()) {
      return this.isRecent();
    }
    return true;
  });

  // Повертає іконку, текст і CSS-клас відповідно до типу
  badgeConfig = computed(() => {
    const activeType: BadgeType = this.isFeatured() ? 'featured' : this.type();
    const override = this.customLabel().trim();
    switch (activeType) {
      case 'featured':
        return {
          icon: ' ',
          label: override || 'Вибір редакції',
          cssClass: 'badge-featured'
        };
      case 'popular':
        return {
          icon: ' ',
          label: override || 'Популярне',
          cssClass: 'badge-popular'
        };
      case 'new':
      default:
        return {
          icon: ' ',
          label: override || 'Нове',
          cssClass: 'badge-new'
        };
    }
  });
}
