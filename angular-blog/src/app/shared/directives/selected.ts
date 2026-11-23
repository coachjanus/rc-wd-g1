import { Directive, input, inject, ElementRef } from '@angular/core';

@Directive({
  selector: '[appSelected]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class Selected {
  private el = inject(ElementRef);
  defaultColor = input('');
  appSelected = input('');

  onMouseEnter() {
    this.highlight(this.appSelected() || this.defaultColor() || 'red','white');
  }

  onMouseLeave() {
    this.highlight('', 'black');
  }

  private highlight(bgcolor: string, color: string) {
    this.el.nativeElement.style.backgroundColor = bgcolor;
    this.el.nativeElement.style.color = color;
  }
}
