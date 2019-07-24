
import * as AppActions from "./state.actions";
import { createReducer, on, Action } from '@ngrx/store';
import { AppState } from './app.state';

export const initialAppState:AppState = {
    loggedIn:false,
    user:null,
    cred:null
};

const reducer = createReducer(
    initialAppState,
    on(AppActions.SetLoginState ,(state,action)=>({ ...state, loggedIn:action.state})),
    on(AppActions.SetUserState ,(state,action)=>({ ...state, ...action})),
    on(AppActions.SetAppState ,(state,action)=>({ ...state, ...action.app}))
);

export function appReducer (state:AppState|undefined,action:Action) {
    return reducer(state,action)
}