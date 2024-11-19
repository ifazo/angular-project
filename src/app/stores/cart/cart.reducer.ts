import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart } from './cart.actions';

export function saveToLocalStorage(state: CartState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('cart', serializedState);
  } catch (e) {
    console.error('Could not save state to local storage', e);
  }
}

export function loadFromLocalStorage(): CartState {
  try {
    const serializedState = localStorage.getItem('cart');
    return serializedState ? JSON.parse(serializedState) : { products: [] };
  } catch (e) {
    console.error('Could not load state from local storage', e);
    return { products: [] };
  }
}

export interface CartState {
  products: any[];
}

export const initialCartState: CartState = loadFromLocalStorage();

export const cartReducer = createReducer(
  initialCartState,

  on(addToCart, (state, { product, quantity }) => {
    const existingProductIndex = state.products.findIndex(
      (p) => p._id === product._id
    );

    const updatedState =
      existingProductIndex > -1
        ? {
            ...state,
            products: state.products.map((p, index) =>
              index === existingProductIndex ? { ...p, quantity } : p
            ),
          }
        : {
            ...state,
            products: [...state.products, { ...product, quantity }],
          };

    saveToLocalStorage(updatedState);
    return updatedState;
  }),

  on(removeFromCart, (state, { productId }) => {
    const updatedState = {
      ...state,
      products: state.products.filter((p) => p._id !== productId),
    };

    saveToLocalStorage(updatedState);
    return updatedState;
  }),

  on(clearCart, (state) => {
    const updatedState = { ...state, products: [] };

    saveToLocalStorage(updatedState);
    return updatedState;
  })
);
