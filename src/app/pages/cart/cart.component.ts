import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { selectCartProducts, selectCartTotal } from '../../stores/cart/cart.selectors';
import { CartState } from '../../stores/cart/cart.reducer';
import { Store } from '@ngrx/store';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { environment } from '../../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ApiService } from '../../services/api.service';

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
    private _api: ApiService,
    private authService: AuthService,
    private store: Store<CartState>
  ) {
    this.stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
    this.products$ = this.store.select(selectCartProducts);
    this.cartTotalPrice$ = this.store.select(selectCartTotal);
  }

  ngOnInit() {
    this.user$ = this.authService.getCurrentUser();
  }

  async handlePayment(): Promise<void> {
    this.createPayment();
  }
  
  private async createPayment() {
    const stripe = await this.stripePromise;
    if (!stripe) {
      alert('Stripe is not available');
      return;
    }
    if (!this.user$) {
      this.router.navigate(['/sign-in']);
      return;
    }
    this.user$.subscribe(user => {
      if (!user) {
        console.error('User not logged in');
        this.router.navigate(['/sign-in']);
        return;
      }  
      this.products$.subscribe(products => {
        this._api
          .createPayment(
            products,
            user.displayName,
            user.email
          )
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
    });
  }
}
