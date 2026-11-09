import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostList } from './features/blog/pages/post-list/post-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PostList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('World of Angular Signals');
}
