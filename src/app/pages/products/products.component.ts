import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  private getProducts() {
    this._api.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
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
