import { Routes } from '@angular/router';
import { createComponent, detailComponent, mainComponent, updateComponent } from '@shared/utils/lazy-load-component';

export const routes: Routes = [
  {
    path: '',
    loadComponent: mainComponent,
    data: { animation: 'mainwaytopay' },
  },
  {
    path: 'detail/:id',
    loadComponent: detailComponent,
    data: { animation: 'detailwaytopay' },
  },
  {
    path: 'create',
    loadComponent: createComponent,
    data: { animation: 'createwaytopay' },
  },
  {
    path: 'update/:id',
    loadComponent: updateComponent,
    data: { animation: 'updatewaytopay' },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
  // { path: '**', loadComponent: pagenotfoundComponent },
];
