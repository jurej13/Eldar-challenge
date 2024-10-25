import { createReducer, on } from '@ngrx/store';
import { initialAuthState } from '../store/auth.state';
import * as AuthActions from '../actions/auth.actions';
export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.loginRequest, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(AuthActions.loginSuccess, (state, { user, role }) => ({
    ...state,
    user,
    role,
    isAuthenticated: true,
    loading: false,
    error: null,
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    user: null,
    role: null,
    isAuthenticated: false,
    loading: false,
    error,
  })),
  on(AuthActions.logout, () => initialAuthState)
);
