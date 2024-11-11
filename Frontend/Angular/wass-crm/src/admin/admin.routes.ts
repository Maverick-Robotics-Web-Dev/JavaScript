import { Routes } from '@angular/router';
import { dashboardComponent } from '@shared/utils/lazy-load-component';
import { settingsRoutes } from '@shared/utils/load-children-routes';

export const ADMIN_ROUTES: Routes = [
  { path: '', loadComponent: dashboardComponent, children: [{ path: 'settings', loadChildren: settingsRoutes }] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
