import { Component } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-feature-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './feature-products.component.html',
  styleUrl: './feature-products.component.css'
})
export class FeatureProductsComponent {
  products: any[] = [];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getRandomProduct();
  }

  private getRandomProduct() {
    this.api.getRandomProducts().subscribe({
      next: (data: any) => {
        this.products = data;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => {
        console.log('Random products fetched successfully.');
      }
    });
  }

}
