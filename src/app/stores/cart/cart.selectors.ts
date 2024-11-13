import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.reducer';

export const selectCartState = createFeatureSelector<CartState>('cart');

export const selectCartTotalCount = createSelector(
  selectCartState,
  (state: CartState) => state.products.length 
);

export const selectCartProducts = createSelector(
  selectCartState,
  (state: CartState) => state.products
);

export const selectCartTotal = createSelector(
  selectCartState,
  (state: CartState) => state.products.reduce((acc, item) => acc + item.price * item.quantity, 0)
);
