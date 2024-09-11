import { Routes } from '@angular/router';
import { waytopayRoutes } from '@routes/way-to-pay';
import { dashboarComponent, homeAdminComponent, homeComponent, loginComponent } from '@shared/utils/lazy-load-component';

export const routes: Routes = [
  { path: '', loadComponent: homeComponent, data: { animation: 'home' } },
  { path: 'login', loadComponent: loginComponent, data: { animation: 'login' } },
  {
    path: 'admin',
    loadComponent: dashboarComponent,
    children: [
      { path: '', loadComponent: homeAdminComponent, data: { animation: 'homeAdmin' } },
      { path: 'way-to-pay', loadChildren: waytopayRoutes },
    ],
    data: { animation: 'admin' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
