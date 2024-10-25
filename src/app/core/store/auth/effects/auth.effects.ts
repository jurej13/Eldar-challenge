import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import * as AuthActions from '../actions/auth.actions';
import { AuthService } from '../../../../public/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
      mergeMap((action) =>
        this.authService.login(action.username).pipe(
          map((response) => {
            if (response.success && response.user) {
              return AuthActions.loginSuccess({
                user: response.user,
                role: response.user.role,
              });
            }
            throw new Error('Login failed');
          }),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message }))
          )
        )
      )
    )
  );
  redirectToDashboard$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(() => {
          this.router.navigate(['private/dashboard']);
        })
      ),
    { dispatch: false }
  );
}