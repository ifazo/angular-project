import { ActionReducerMap } from '@ngrx/store';
import { cartReducer, CartState } from './cart/cart.reducer';
import { userReducer, UserState } from './user/user.reducer';

export interface AppState {
  cart: CartState;
  user: UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  cart: cartReducer,
  user: userReducer,
};
