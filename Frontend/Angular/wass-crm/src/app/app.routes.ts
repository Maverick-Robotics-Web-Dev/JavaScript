import { Routes } from '@angular/router';
import { adminRoutes } from '@shared/utils/load-children-routes';

export const routes: Routes = [
  { path: 'admin', loadChildren: adminRoutes },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
