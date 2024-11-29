import { Component } from '@angular/core';
import { ListComponent } from '@shared/components/list';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [ListComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
})
export class BranchOfficesListComponent {}
