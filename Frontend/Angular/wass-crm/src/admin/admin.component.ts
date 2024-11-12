import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarAdminComponent } from '@shared/components/navbar-admin';
import { SidebarAdminComponent } from '@shared/components/sidebar-admin/sidebar-admin.component';

@Component({
  selector: 'comp-admin',
  standalone: true,
  imports: [RouterOutlet, NavbarAdminComponent, SidebarAdminComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {}
