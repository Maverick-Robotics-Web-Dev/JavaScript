import { Routes } from '@angular/router';
import { branchOfficesComponent, listComponent } from '@shared/utils/lazy-load-component';

export const BRANCHOFFICES_ROUTES: Routes = [
  // { path: '', loadComponent: branchOfficesComponent, children: [{ path: 'list', loadComponent: listComponent }] },
  // { path: '', loadComponent: branchOfficesComponent },
  { path: '', loadComponent: listComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
