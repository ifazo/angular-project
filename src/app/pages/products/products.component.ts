import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginationComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  totalProducts: number = 0;
  skip = 0;

  constructor(private _api: ApiService) {}

  ngOnInit(skip: number = 0) {
    this.getPaginatedProducts(skip);
  }

  getPaginatedProducts(skip: number) {
    this._api.getPaginatedProducts(skip).subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Products fetched successfully.');
      }
    });
  }
}
