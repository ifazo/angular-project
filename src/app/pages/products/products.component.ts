import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CategoryFiltersComponent } from '../../components/category-filters/category-filters.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CategoryFiltersComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private _api: ApiService) {}
  ngOnInit(): void {
    this._api.getProducts().subscribe({
      next: (result) => {
        console.log(result);
      },
      error: (error) => {
        console.log(error);
      },
      complete: () => {
        console.log('products complete');
      },
    });
  }
}
