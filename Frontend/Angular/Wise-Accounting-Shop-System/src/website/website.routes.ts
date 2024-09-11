import { Routes } from '@angular/router';
import { homeComponent } from '@shared/utils/lazy-load-component';

export const WEBSITE_ROUTES: Routes = [
  { path: '', loadComponent: homeComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
