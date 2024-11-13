import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[Cart] Add',  props<{ product: any; quantity: number }>());
export const removeFromCart = createAction(
  '[Cart] Remove',
  props<{ productId: string }>()
);
export const clearCart = createAction('[Cart] clear');
