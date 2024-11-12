import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  productId: string | null = null;
  product: any = {};
  mainImage: string = '';
  filledStars: number[] = [];
  emptyStars: number[] = [];
  loading: boolean = true;

  
  constructor(private route: ActivatedRoute, private _api: ApiService) {}
  
  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }
  
  changeImage(imageUrl: string): void {
    this.mainImage = imageUrl;
  }

  private getProduct() {
    this._api.getProduct(this.productId).subscribe({
      next: (data: any) => {
        this.product = data;
        if (this.product) {
          this.mainImage = this.product.images[0];
          this.filledStars = Array(Math.ceil(this.product.rating)).fill(0);
          this.emptyStars = Array(5 - Math.ceil(this.product.rating)).fill(0);
          this.loading = false;
        }
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
      },
      complete: () => {
        console.log('product complete');
      },
    });
  }
}