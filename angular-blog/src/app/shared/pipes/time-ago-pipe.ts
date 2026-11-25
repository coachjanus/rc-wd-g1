import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
})
export class TimeAgoPipe implements PipeTransform {
  private readonly rtf = new Intl.RelativeTimeFormat('uk', { numeric: 'auto' });

  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return '';
    }
  
  const date = value instanceof Date ? value : new Date(value);

  const diffInSeconds = Math.round((date.getTime() - Date.now()) / 1000);
  const intervals: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: 'year', seconds: 31536000 },
    { unit: 'month', seconds: 2592000 },
    { unit: 'day', seconds: 86400 },
    { unit: 'hour', seconds: 3600 },
    { unit: 'minute', seconds: 60 }
  ];
  for(const interval of intervals) {
    if (Math.abs(diffInSeconds) >= interval.seconds) {
      const count = Math.round(diffInSeconds / interval.seconds);
      return this.rtf.format(count, interval.unit);
    }
  }
 return 'щойно';
 }
}