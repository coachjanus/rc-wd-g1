import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FirstComponent } from './features/blog/pages/first-component/first-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FirstComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('World of Angular Signals');
}
