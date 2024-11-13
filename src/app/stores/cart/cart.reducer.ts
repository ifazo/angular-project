import { createReducer, on } from '@ngrx/store';
import { addToCart, clearCart, removeFromCart } from './cart.actions';

export interface CartState {
  products: any[];
}

export const initialCartState: CartState = {
  products: [],
};

export const cartReducer = createReducer(
  initialCartState,
    
  on(addToCart, (state, { product, quantity }) => {
    const existingProductIndex = state.products.findIndex(p => p._id === product._id);

    if (existingProductIndex > -1) {
      const updatedProducts = state.products.map((p, index) => 
        index === existingProductIndex 
          ? { ...p, quantity }
          : p
      );
      return { ...state, products: updatedProducts };
    } else {
      return { ...state, products: [...state.products, { ...product, quantity }] };
    }
    }),
  
    on(removeFromCart, (state, { productId }) => ({
      ...state,
      products: state.products.filter(p => p._id !== productId)
    })),
  
    on(clearCart, (state) => ({ ...state, products: [] }))
);
