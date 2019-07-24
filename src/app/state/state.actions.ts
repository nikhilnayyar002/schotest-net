import { createAction, props } from '@ngrx/store';
import { User } from '../modals/user';
import { AppState } from './app.state';

/**
 * Set logged in state
 */
export const SetLoginState = createAction(
  '[Login] Set',
  props<{state:boolean}>()
);
/**
 * Set user 
 */
export const SetUserState = createAction(
  '[User] Set',
  props<{user:User}>()
);

export const SetAppState = createAction(
  '[App] Set',
  props<{app:AppState}>()
);

export const SetRedirectURL = createAction(
  '[RedirectURL] Set',
  props<{redirectURL:string}>()
);