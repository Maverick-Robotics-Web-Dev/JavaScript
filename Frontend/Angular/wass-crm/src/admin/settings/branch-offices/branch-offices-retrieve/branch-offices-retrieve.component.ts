import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { DataSharingService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchOfficeModel, BranchOfficeRetrieveModel } from '@core/models/settings';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'comp-branch-offices-retrieve',
  standalone: true,
  imports: [],
  templateUrl: './branch-offices-retrieve.component.html',
  styleUrl: './branch-offices-retrieve.component.scss',
})
export class BranchOfficesRetrieveComponent implements OnInit {
  // @Input() id!: string;

  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public id!: string;
  public branchOfficeRetrieveData!: BranchOfficeModel | undefined;
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public modalStatus: boolean = false;

  ngOnInit(): void {
    this.sharingData();
  }

  private sharingData() {
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.openRetrieve == true) {
            console.log(data.openRetrieve);
            this.modalStatus = data.openRetrieve;
          }

          if (data.closeRetrieve == false) {
            console.log(data.closeRetrieve);
            this.modalStatus = data.closeRetrieve;
          }

          if (data.id) {
            // this.id = data.id;
            console.log(data.id);
            this.retrieve(data.id);
          }
        }
      },
    });
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeRetrieve: false });
  }

  private retrieve(id: string) {
    this._branchOfficesServices
      .retrieve(id)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeRetrieveModel) => {
          if (resp.ok == 'OK') {
            this.branchOfficeRetrieveData = resp.data;
            console.log(this.branchOfficeRetrieveData);
          }
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
  }
}
