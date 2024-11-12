import { Routes } from '@angular/router';
import { settingsComponent } from '@shared/utils/lazy-load-component';
import { branchOfficesRoutes } from '@shared/utils/load-children-routes';

export const SETTINGS_ROUTES: Routes = [
  { path: '', loadComponent: settingsComponent },
  { path: 'branch-offices', loadChildren: branchOfficesRoutes },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
