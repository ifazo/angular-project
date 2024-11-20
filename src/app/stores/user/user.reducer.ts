import { createReducer, on } from '@ngrx/store';
import { setUser, removeUser } from './user.actions';

export interface UserState {
  user: {
    uid: string;
    email: string;
    displayName: string;
    photoURL: string;
    creationTime: string;
    lastSignInTime: string;
  } | null;
}

export function saveToLocalStorage(state: UserState): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('user', serializedState);
  } catch (e) {
    console.error('Could not save user state to local storage', e);
  }
}

export function loadFromLocalStorage(): UserState {
  if (typeof window === 'undefined') {
    return { user: null };
  }
  try {
    const serializedState = localStorage.getItem('user');
    return serializedState ? JSON.parse(serializedState) : { user: null };
  } catch (e) {
    console.error('Could not load user state from local storage', e);
    return { user: null };
  }
}

export const initialUserState: UserState = loadFromLocalStorage();

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
