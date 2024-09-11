import { Routes } from '@angular/router';
import { loginComponent } from '@shared/utils/lazy-load-component';

export const AUTH_ROUTES: Routes = [
  { path: 'login', loadComponent: loginComponent },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
