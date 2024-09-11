import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '@shared/components/nav-bar';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {}
