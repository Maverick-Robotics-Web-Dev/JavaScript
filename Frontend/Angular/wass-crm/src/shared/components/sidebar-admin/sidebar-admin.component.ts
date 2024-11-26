import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'comp-sidebar-admin',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar-admin.component.html',
  styleUrl: './sidebar-admin.component.scss',
})
export class SidebarAdminComponent {}
