import { createAction, props } from '@ngrx/store';

export const addToCart = createAction('[Cart] Add', props<{ product: any }>());
export const removeFromCart = createAction(
  '[Cart] Remove',
  props<{ productId: string }>()
);
export const reset = createAction('[Cart] Reset');
