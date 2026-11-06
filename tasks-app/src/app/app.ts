import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('tasks-app');
  
  tasks: string[] = ['Вивчити Angular', 'Створити модуль', 'Попити кави'];
  newTask = '';


  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }
  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
