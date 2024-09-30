import { Routes } from '@angular/router';
import { adminRoutes, authRoutes, websiteRoutes } from '@shared/utils/load-children-routes';

export const routes: Routes = [
  { path: 'home', loadChildren: websiteRoutes },
  { path: 'auth', loadChildren: authRoutes },
  { path: 'admin', loadChildren: adminRoutes },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
