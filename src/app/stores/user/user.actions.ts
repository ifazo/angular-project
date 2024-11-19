import { createAction, props } from '@ngrx/store';

export const setUser = createAction(
  '[User] Set',
  props<{ user: any }>()
);

export const removeUser = createAction('[User] Remove');
