import { Component, signal } from '@angular/core';
import { RouterOutlet, ActivatedRoute } from '@angular/router';
import { Highlight } from './shared/directives/highlight';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Highlight],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('World of Angular Signals');
}
