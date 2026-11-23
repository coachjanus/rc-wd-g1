import { Directive, inject, ElementRef } from '@angular/core';


@Directive({
  selector: '[appHighlight]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  },
})
export class Highlight {
  private el = inject(ElementRef);
  // constructor() {
  //   this.el.nativeElement.style.backgroundColor = 'yellow';
  // }

  onMouseEnter() {
    this.highlight('red', 'white');
  }
  onMouseLeave() {
    this.highlight('white', 'black');
  }
  private highlight(bgcolor: string, color: string) {
    this.el.nativeElement.style.backgroundColor = bgcolor;
    this.el.nativeElement.style.color = color;
  }
}
