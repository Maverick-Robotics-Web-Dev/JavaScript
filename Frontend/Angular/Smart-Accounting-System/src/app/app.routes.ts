import { Routes } from '@angular/router';
import { LoginComponent } from '@pages/auth/login/login.component';
import { waytopayRoutes } from '@routes/index';
import { dashboarComponent, homeComponent, loginComponent } from '@shared/utils/lazy-load-component';

export const routes: Routes = [
  { path: '', loadComponent: homeComponent },
  { path: 'login', loadComponent: loginComponent },
  { path: 'admin', loadComponent: dashboarComponent, children: [{ path: 'way-to-pay', loadChildren: waytopayRoutes }] },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
