import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Store, StoreModule } from '@ngrx/store';
import { selectCartTotalCount } from '../../stores/cart/cart.selectors';
import { addToCart, removeFromCart } from '../../stores/cart/cart.actions';
import { CartState } from '../../stores/cart/cart.reducer';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, StoreModule],
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

  cartTotalCount$: Observable<number>;
  
  constructor(private route: ActivatedRoute, private _api: ApiService, private store: Store<CartState>) {
    this.cartTotalCount$ = this.store.select(selectCartTotalCount);
  }

  addToCart(product: any): void {
    this.store.dispatch(addToCart({product}));
    console.log('added to cart', product);
  }

  removeFromCart(productId: string): void {
    this.store.dispatch(removeFromCart({productId}));
    console.log('removed from cart', productId);
  }
  
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