import { Directive, ElementRef, HostListener, Renderer2, inject } from '@angular/core';
@Directive({
  selector: '[appRippleEffect]',
})
export class RippleEffect {
  private el = inject(ElementRef);
  private renderer = inject(Renderer2);
  @HostListener('click', ['$event']) onClick(event: MouseEvent) {
    const button = this.el.nativeElement;
    const circle = this.renderer.createElement('span');

    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    const rect = button.getBoundingClientRect();
    Object.assign(circle.style, {
      width: `${diameter}px`,
      height: `${diameter}px`,
      left: `${event.clientX - rect.left - radius}px`,
      top: `${event.clientY - rect.top - radius}px`,
      position: 'absolute',
      borderRadius: '50%',
      transform: 'scale(0)',
      animation: 'ripple-animation 600ms linear',
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      pointerEvents: 'none'
    });
    this.renderer.appendChild(button, circle);
    // Видаляємо елемент після завершення анімації
    setTimeout(() => {
      this.renderer.removeChild(button, circle);
    }, 600);
  }
}