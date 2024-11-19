import { createReducer, on } from '@ngrx/store';
import { setUser, removeUser } from './user.actions';

export function saveToLocalStorage(state: UserState): void {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (e) {
    console.error('Could not save user state to local storage', e);
  }
}

export function loadFromLocalStorage(): UserState {
  try {
    const serializedState = localStorage.getItem('user');
    return serializedState ? JSON.parse(serializedState) : { user: null };
  } catch (e) {
    console.error('Could not load user state from local storage', e);
    return { user: null };
  }
}

export interface UserState {
  user: any | null;
}

export const initialUserState: UserState = loadFromLocalStorage() || { user: null };

export const userReducer = createReducer(
  initialUserState,

  on(setUser, (state, { user }) => {
    const updatedState = { ...state, user };

    saveToLocalStorage(updatedState);
    return updatedState;
  }),

  on(removeUser, (state) => {
    const updatedState = { ...state, user: null };

    saveToLocalStorage(updatedState);
    return updatedState;
  })
);
