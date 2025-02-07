import { Component, DestroyRef, inject, Input } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { DataSharingService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchOfficeRetrieveModel } from '@core/models/settings';

@Component({
  selector: 'comp-branch-offices-retrieve',
  standalone: true,
  imports: [],
  templateUrl: './branch-offices-retrieve.component.html',
  styleUrl: './branch-offices-retrieve.component.scss',
})
export class BranchOfficesRetrieveComponent {
  @Input() id!: string;

  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeRetrieveData!: BranchOfficeRetrieveModel;
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;

  private retrieve() {
    // this._branchOfficesServices.retrieve();
  }
}
