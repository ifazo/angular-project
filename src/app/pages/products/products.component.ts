import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule, PaginatorModule, ButtonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  totalProducts: number = 0;
  first: number = 0;
  rows: number = 12;

  constructor(private _api: ApiService) {}

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.ngOnInit(this.first, this.rows);
  }

  ngOnInit(first: number = 0, rows: number = 12) {
    this.getPaginatedProducts(first, rows);
  }

  private getPaginatedProducts(first: number = 0, rows: number = 12) {
    this._api.getPaginatedProducts(first, rows).subscribe({
      next: (data: any) => {
        this.products = data.products;
        this.totalProducts = data.totalProducts;
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        console.log('products complete');
      },
    });
  }
}
