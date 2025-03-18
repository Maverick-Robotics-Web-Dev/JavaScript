import { Component, DestroyRef, inject, Input, OnInit } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { DataSharingService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchOfficeModel, BranchOfficeRetrieveModel } from '@core/models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-retrieve',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './branch-offices-retrieve.component.html',
  styleUrl: './branch-offices-retrieve.component.scss',
})
export class BranchOfficesRetrieveComponent implements OnInit {
  // @Input() id!: string;

  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public id!: string;
  public branchOfficeRetrieveData!: BranchOfficeModel;
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public modalStatus: boolean = false;

  ngOnInit(): void {
    this.sharingData();
    this.loading = this._branchOfficesServices.isLoading$;
  }

  private sharingData() {
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.openRetrieve == true) {
            this.id = data.id;
            this.retrieve();
            this.modalStatus = data.openRetrieve;
          }

          if (data.closeRetrieve == false) {
            this.modalStatus = data.closeRetrieve;
          }

          if (data.id) {
            this.id = data.id;
            this.retrieve();
          }
        }
      },
    });
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeRetrieve: false });
  }

  private retrieve() {
    this._branchOfficesServices
      .retrieve(this.id)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeRetrieveModel) => {
          if (resp.ok == 'OK') {
            if (resp.data) {
              this.branchOfficeRetrieveData = resp.data;
            }
          }
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
  }
}
