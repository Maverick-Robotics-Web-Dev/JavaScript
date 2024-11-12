import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdminComponent } from '../../shared/components/navbar-admin/navbar-admin.component';
import { SidebarAdminComponent } from '../../shared/components/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'comp-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
