import { Directive, input, signal } from '@angular/core';
@Directive({
  selector: '[appHovered]',
  host: {
    '[style.backgroundColor]': 'isHovered() ? highlightColor() : defaultColor()',
    '[style.transition]': '"background-color 0.25s ease"',
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HoveredDirective {
  // Вхідний сигнал для кольору при наведенні (з дефолтним значенням)
  highlightColor = input<string>('#f0f8ff', { alias: 'appHighlight' });
  defaultColor = input<string>('transparent');

  // Локальний стан директиви на базі сигналу
  protected isHovered = signal(false);
  protected onMouseEnter(): void {
    this.isHovered.set(true);
  }
  protected onMouseLeave(): void {
    this.isHovered.set(false);
  }
}