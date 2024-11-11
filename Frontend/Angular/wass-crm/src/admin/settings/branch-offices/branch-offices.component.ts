import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'comp-branch-offices',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './branch-offices.component.html',
  styleUrl: './branch-offices.component.scss',
})
export class BranchOfficesComponent {}
