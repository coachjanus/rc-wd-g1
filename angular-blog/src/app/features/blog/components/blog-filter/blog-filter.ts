import { Component, output, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';

export type SortOrder = 'latest' | 'oldest';

@Component({
  selector: 'app-blog-filter',
  imports: [FormsModule],
  templateUrl: './blog-filter.html',
  styleUrl: './blog-filter.css',
})
export class BlogFilter {
  categories = input.required<string[]>();
  searchQuery = model<string>('');
  selectedCategory = model<string>('Всі');
  sortBy = model<SortOrder>('latest');
  isGridView = model<boolean>(true);
  
  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }
  clearSearch(): void {
    this.searchQuery.set('');
  }
  toggleViewMode(): void {
    this.isGridView.update(v => !v);
  }
}
