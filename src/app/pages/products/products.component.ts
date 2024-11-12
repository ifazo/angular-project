import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  constructor(private _api: ApiService) {}

  ngOnInit(): void {
    this._api.getProducts().subscribe({
      next: (data: any) => {
        this.products = data.products;
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
