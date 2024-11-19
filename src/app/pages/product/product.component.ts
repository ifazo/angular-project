import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { Store, StoreModule } from '@ngrx/store';
import { addToCart } from '../../stores/cart/cart.actions';
import { CartState } from '../../stores/cart/cart.reducer';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { UserState } from '../../stores/user/user.reducer';
import { selectUser } from '../../stores/user/user.selectors';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, StoreModule, FormsModule, RatingModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  user$!: Observable<any>;
  productId: string | null = null;
  product: any = {};
  quantity: number = 1;
  loading: boolean = true;
  value!: number;
  mainImage: string = '';
  filledStars: number[] = [];
  emptyStars: number[] = [];

  private stripePromise: Promise<Stripe | null>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private api: ApiService,
    private userStore: Store<UserState>,
    private cartStore: Store<CartState>
  ) {
    this.stripePromise = loadStripe(environment.STRIPE_PUBLISHABLE_KEY);
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    this.user$ = this.userStore.select(selectUser);
    this.getProduct();
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
      this.api
        .createPayment(
          [{ ...this.product, quantity: this.quantity }],
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
  }

  addToCart(): void {
    this.cartStore.dispatch(
      addToCart({ product: this.product, quantity: this.quantity })
    );
  }

  getStars(rating: number): number[] {
    return Array(rating).fill(0);
  }

  formatDate(date: string): string {
    const d = new Date(date);
    return `${d.getDate()}-${d.getMonth() + 1}-${d.getFullYear()}`;
  }

  totalPrice() {
    return this.product.price * this.quantity;
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  changeImage(imageUrl: string): void {
    this.mainImage = imageUrl;
  }

  private getProduct() {
    this.api.getProduct(this.productId).subscribe({
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
