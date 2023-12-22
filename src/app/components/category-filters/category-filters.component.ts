import { Component } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-category-filters',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './category-filters.component.html',
  styleUrl: './category-filters.component.css'
})
export class CategoryFiltersComponent {

}
