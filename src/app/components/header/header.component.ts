import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { Store } from '@ngrx/store';
import { CartState } from '../../stores/cart/cart.reducer';
import {
  selectCartProducts,
  selectCartTotal,
  selectCartTotalCount,
} from '../../stores/cart/cart.selectors';
import { clearCart, removeFromCart } from '../../stores/cart/cart.actions';
import { environment } from '../../../environments/environment';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  isCartOpen = false;
  user$!: Observable<any>;
  cartProducts$: Observable<any[]>;
  cartTotalProducts$: Observable<number>;
  cartTotalPrice$: Observable<number>;

  private stripePromise: Promise<Stripe | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _api: ApiService,
    private messageService: MessageService,
    private store: Store<CartState>
  ) {
    this.stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
    this.cartProducts$ = this.store.select(selectCartProducts);
    this.cartTotalProducts$ = this.store.select(selectCartTotalCount);
    this.cartTotalPrice$ = this.store.select(selectCartTotal);
  }

  showSuccessToast() {
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Sign out successfully!',
    });
  }

  showErrorToast() {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Error signing out!',
    });
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
      this.cartProducts$.subscribe(cartProducts => {
        this._api
          .createPayment(
            cartProducts,
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

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(productId: string) {
    this.store.dispatch(removeFromCart({ productId }));
  }

  clearCart() {
    this.store.dispatch(clearCart());
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        this.showSuccessToast();
        this.router.navigate(['/sign-in']);
      })
      .catch(() => {
        this.showErrorToast();
      });
  }
}
