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

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  user$!: Observable<any>;
  isCartOpen = false;
  cartProducts$: Observable<any[]>;
  cartTotalProducts$: Observable<number>;
  cartTotalPrice$: Observable<number>;

  constructor(
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService,
    private store: Store<CartState>
  ) {
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
