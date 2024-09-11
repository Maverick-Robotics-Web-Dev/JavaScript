import { Routes } from '@angular/router';
import { authRoutes, websiteRoutes } from '@shared/utils/load-children-routes';

export const routes: Routes = [
  { path: 'home', loadChildren: websiteRoutes },
  { path: 'auth', loadChildren: authRoutes },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
