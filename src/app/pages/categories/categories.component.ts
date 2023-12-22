import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css',
})
export class CategoriesComponent implements OnInit {
  categories: any;

  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories() {
    this._api.getCategories().subscribe({
      next: (result) => {
        console.log(result);
        this.categories = result;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('categories complete');
      },
    });
  }
}
