import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'readingTime',
})
export class ReadingTimePipe implements PipeTransform {
  transform(content: string | null | undefined, wordsPerMinute: number = 200): string {
    if (!content?.trim()) {
      return '1 хв читання';
    }
    const wordsCount = content.trim().split(/\s+/).length;
    const minutes = Math.max(1, Math.ceil(wordsCount / wordsPerMinute));
    return `${minutes} хв читання`;
  }
}
