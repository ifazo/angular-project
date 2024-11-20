import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { combineLatest, Observable, take } from 'rxjs';
import {
  selectCartProducts,
  selectCartTotal,
} from '../../stores/cart/cart.selectors';
import { CartState } from '../../stores/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ApiService } from '../../services/api.service';
import { UserState } from '../../stores/user/user.reducer';
import { selectUser } from '../../stores/user/user.selectors';
import { removeFromCart } from '../../stores/cart/cart.actions';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  user$!: Observable<any>;
  products$: Observable<any[]>;
  cartTotalPrice$: Observable<number>;

  private stripePromise: Promise<Stripe | null>;

  constructor(
    private router: Router,
    private api: ApiService,
    private userStore: Store<UserState>,
    private cartStore: Store<CartState>
  ) {
    this.stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
    this.products$ = this.cartStore.select(selectCartProducts);
    this.cartTotalPrice$ = this.cartStore.select(selectCartTotal);
    this.user$ = this.userStore.select(selectUser);
  }

  async handlePayment(event: Event): Promise<void> {
    event.preventDefault();
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe.js has not loaded yet');
      return;
    }
    combineLatest([this.user$, this.products$])
      .pipe(take(1))
      .subscribe(([user, products]) => {
        if (!user) {
          console.error('User not logged in');
          this.router.navigate(['/sign-in']);
          return;
        }

        this.api
          .createPayment(products, user.displayName, user.email)
          .subscribe({
            next: async (session: any) => {
              await stripe.redirectToCheckout({ sessionId: session.id });
              console.log('Checkout session created:', session);
            },
            error: (err) => {
              console.error('Error creating checkout session:', err);
            },
          });
      });
  }

  removeFromCart(productId: string) {
    this.cartStore.dispatch(removeFromCart({ productId }));
  }
}
