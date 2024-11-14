import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectCartProducts } from '../../stores/cart/cart.selectors';
import { CartState } from '../../stores/cart/cart.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  products$: Observable<any[]>;

  constructor(private store: Store<CartState>) {
    this.products$ = this.store.select(selectCartProducts);
  }
}
