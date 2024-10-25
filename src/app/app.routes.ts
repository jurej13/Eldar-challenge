import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./public/public-routing.module').then(
        (m) => m.PublicRoutingModule
      ),
  },
  { path: '**', redirectTo: 'auth' },
];
