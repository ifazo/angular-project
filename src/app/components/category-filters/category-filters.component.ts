import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css',
})
export class CategoryFiltersComponent {
  isFilterMenuOpen = false;
  isSortMenuOpen = false;
  isCategoryMenuOpen = false;
  handleFilterButtonClick() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
  }
  handleSortButtonClick() {
    this.isSortMenuOpen = !this.isSortMenuOpen;
  }
  handleCategoryButtonClick() {
    this.isCategoryMenuOpen = !this.isCategoryMenuOpen;
  }
}
