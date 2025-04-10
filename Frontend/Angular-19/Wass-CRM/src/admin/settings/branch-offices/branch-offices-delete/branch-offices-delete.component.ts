import { Component } from '@angular/core';
import { createComponentAnimations } from '../branch-offices-animation';

@Component({
  selector: 'comp-branch-offices-delete',
  standalone: true,
  imports: [],
  templateUrl: './branch-offices-delete.component.html',
  styleUrl: './branch-offices-delete.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesDeleteComponent {}
