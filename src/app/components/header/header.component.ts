import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { combineLatest, Observable, take } from 'rxjs';
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
import { UserState } from '../../stores/user/user.reducer';
import { removeUser } from '../../stores/user/user.actions';
import { selectUser } from '../../stores/user/user.selectors';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  isCartOpen = false;
  user$!: Observable<any>;
  cartProducts$: Observable<any[]>;
  cartTotalProducts$: Observable<number>;
  cartTotalPrice$: Observable<number>;

  private stripePromise: Promise<Stripe | null>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private api: ApiService,
    private messageService: MessageService,
    private cartStore: Store<CartState>,
    private userStore: Store<UserState>
  ) {
    this.stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
    this.cartProducts$ = this.cartStore.select(selectCartProducts);
    this.cartTotalProducts$ = this.cartStore.select(selectCartTotalCount);
    this.cartTotalPrice$ = this.cartStore.select(selectCartTotal);
    this.user$ = this.userStore.select(selectUser);
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

  async handlePayment(event: Event): Promise<void> {
    event.preventDefault();
    const stripe = await this.stripePromise;
    if (!stripe) {
      console.error('Stripe failed to load');
      return;
    }
    combineLatest([this.user$, this.cartProducts$])
      .pipe(take(1))
      .subscribe(([user, cartProducts]) => {
        if (!user) {
          console.error('User not logged in');
          this.router.navigate(['/sign-in']);
          return;
        }
        this.api
          .createPayment(cartProducts, user.displayName, user.email)
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

  toggleCart() {
    this.isCartOpen = !this.isCartOpen;
  }

  removeFromCart(productId: string) {
    this.cartStore.dispatch(removeFromCart({ productId }));
  }

  clearCart() {
    this.cartStore.dispatch(clearCart());
  }

  signOut() {
    this.authService
      .signOut()
      .then(() => {
        this.userStore.dispatch(removeUser());
        this.showSuccessToast();
        this.router.navigate(['/sign-in']);
      })
      .catch(() => {
        this.showErrorToast();
      });
  }
}
