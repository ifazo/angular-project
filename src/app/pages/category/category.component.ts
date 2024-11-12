import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent implements OnInit {
  categorySlug: string | null = null;
  products: any[] = [];
  loading = true;

  constructor(private route: ActivatedRoute, private _api: ApiService) {}

  ngOnInit(): void {
    this.categorySlug = this.route.snapshot.paramMap.get('slug');
    this.getProductsByCategory();
  }

  private getProductsByCategory() {
    this._api.getProductsByCategory(this.categorySlug).subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.loading = false;
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        console.log('products complete');
      },
    });
  }
}
