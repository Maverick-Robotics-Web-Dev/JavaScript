import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdminComponent } from '@shared/components/navbar-admin';

@Component({
  selector: 'comp-dashboard',
  standalone: true,
  imports: [NavbarAdminComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
