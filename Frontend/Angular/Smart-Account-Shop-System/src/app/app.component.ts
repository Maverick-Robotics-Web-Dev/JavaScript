import { Component, inject } from '@angular/core';
import { ChildrenOutletContexts, Data, RouterOutlet } from '@angular/router';
import { routeAnimation } from '@shared/utils/animations/animation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [routeAnimation],
})
export class AppComponent {
  title = 'Smart-Account-Shop-System';
  private contexts: ChildrenOutletContexts = inject(ChildrenOutletContexts);

  public getRouteAnimationData(): Data | undefined {
    return this.contexts.getContext('primary')?.route?.snapshot.data?.['animation'];
  }
}
