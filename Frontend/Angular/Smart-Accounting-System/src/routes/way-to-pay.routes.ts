import { Routes } from '@angular/router';
import { createComponent, detailComponent, mainComponent, updateComponent } from '@shared/utils/lazy-load-component';

export const routes: Routes = [
  { path: '', loadComponent: mainComponent },
  { path: 'detail/:id', loadComponent: detailComponent },
  { path: 'create', loadComponent: createComponent },
  { path: 'update/:id', loadComponent: updateComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: '**', loadComponent: pagenotfoundComponent },
];
