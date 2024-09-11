import { Component } from '@angular/core';
import { LoaderComponent } from '@shared/components/loader';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
