import { Component } from '@angular/core';
import { TooltipDirective } from '../../directives/tooltip.directive';
import { RippleEffect } from '../../directives/ripple-effect.directive';
@Component({
  selector: 'app-custom-button',
  imports: [],
  template: `<ng-content></ng-content>`,
  styleUrl: './custom-button.css',
  hostDirectives: [{
    directive: TooltipDirective,
    inputs: ['tooltipText: hint'], // Прокидання з аліасом
  },
    RippleEffect // Просте підключення без параметрів
  ]
})
export class CustomButton { }