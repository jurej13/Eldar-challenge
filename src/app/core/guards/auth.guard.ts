import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectRole } from '../store/auth/selectors/auth.selectors';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store);
  const router = inject(Router);
  return store.select(selectRole).pipe(
    take(1),
    map((role) => {
      if (role) {
        return true;
      }
      router.navigate(['/login']);
      return false;
    })
  );
};
