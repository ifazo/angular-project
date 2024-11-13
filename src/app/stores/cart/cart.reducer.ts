import { createReducer, on } from '@ngrx/store';
import { addToCart, removeFromCart, reset } from './cart.actions';

export interface CartState {
  products: any[];
}

export const initialCartState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialCartState,
  on(addToCart, (state, { product }) => ({ ...state, products: [...state.products, product] })),
  on(removeFromCart, (state, { productId }) => ({ ...state, products: state.products.filter(p => p._id !== productId) })),
  on(reset, (state) => ({ ...state, count: 0 }))
);
