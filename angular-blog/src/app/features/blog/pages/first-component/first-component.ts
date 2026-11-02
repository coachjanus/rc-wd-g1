import { Component, signal } from '@angular/core';


@Component({
  selector: 'hello-component',
  templateUrl: './first-component.html',
  styleUrl: './first-component.css'
})
export class FirstComponent {
  protected readonly title = signal('My First Component');
  protected readonly description = signal('This is my first component 🎉');
}
