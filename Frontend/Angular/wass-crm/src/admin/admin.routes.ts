import { Routes } from '@angular/router';
import { adminComponent, dashboardComponent } from '@shared/utils/lazy-load-component';
import { settingsRoutes } from '@shared/utils/load-children-routes';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: adminComponent,
    children: [
      { path: 'dashboard', loadComponent: dashboardComponent },
      { path: 'settings', loadChildren: settingsRoutes },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
