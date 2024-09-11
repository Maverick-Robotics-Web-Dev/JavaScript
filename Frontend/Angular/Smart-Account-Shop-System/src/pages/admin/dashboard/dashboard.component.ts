import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, Data, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '@shared/components/nav-bar';
import { routeAnimation } from '@shared/utils/animations/animation';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  animations: [routeAnimation],
})
export class DashboardComponent {
  private contexts: ChildrenOutletContexts = inject(ChildrenOutletContexts);

  public getRouteAnimationData(): Data | undefined {
    return this.contexts.getContext('primary')?.route?.snapshot.data?.['animation'];
  }
}
