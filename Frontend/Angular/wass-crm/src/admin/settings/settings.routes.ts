import { Routes } from '@angular/router';
import { branchOfficesRoutes } from '@shared/utils/load-children-routes';

export const SETTINGS_ROUTES: Routes = [
  { path: 'branch-offices', loadChildren: branchOfficesRoutes },
  { path: '**', redirectTo: 'branch-offices', pathMatch: 'full' },
];
