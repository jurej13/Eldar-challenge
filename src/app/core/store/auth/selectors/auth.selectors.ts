import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../store/auth.state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  (state) => state.user
);

export const selectRole = createSelector(
  selectAuthState,
  (state) => state.role
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state) => state.isAuthenticated
);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);
