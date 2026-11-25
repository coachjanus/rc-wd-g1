import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    limit: number = 120,
    completeWords: boolean = true,
    ellipsis: string = '...'
  ): string {
    if (!value) {
      return '';
    }
    const trimmed = value.trim();
    if (trimmed.length <= limit) {
      return trimmed;
    }
    let truncated = trimmed.slice(0, limit);
    // Якщо ввімкнено режим цілих слів — відкочуємося до останнього пробілу
    if (completeWords) {
      const lastSpaceIndex = truncated.lastIndexOf(' ');
      if (lastSpaceIndex > 0) {
        truncated = truncated.slice(0, lastSpaceIndex);
      }
    }
    // Прибираємо зайві розділові знаки в кінці перед трикрапкою (наприклад, кому чи крапку)
    truncated = truncated.replace(/[.,!?;:\s]+$/, '');
    return `${truncated}${ellipsis}`;
  }
}
