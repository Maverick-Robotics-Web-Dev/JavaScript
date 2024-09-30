import { Routes } from '@angular/router';
import { dashboardComponent } from '@shared/utils/lazy-load-component';

export const ADMIN_ROUTES: Routes = [
  { path: 'dashboard', loadComponent: dashboardComponent },
  { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
];
