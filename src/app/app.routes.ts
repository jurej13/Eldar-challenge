import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./public/public-routing.module').then(
        (m) => m.PublicRoutingModule
      ),
  },
  {
    path: 'private',
    loadChildren: () =>
      import('./private/private-routing.module').then(
        (m) => m.PrivateRoutingModule
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'auth' },
];
