import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeListModel, BranchOfficeModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { BranchOfficesRetrieveComponent } from '../branch-offices-retrieve';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [AsyncPipe, NgClass, BranchOfficesCreateComponent, BranchOfficesRetrieveComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesListComponent implements OnInit {
  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOfficeModel[];
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading$;
    this.list();
    this.sharingData();
  }

  private sharingData() {
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.resp == 'OK') {
            this.list();
          }
        }
      },
    });
  }

  public openModal() {
    this._dataSharingService.setDataShare({ openCreate: true });
  }

  public getId(id: number) {
    this._dataSharingService.setDataShare({ openRetrieve: true, id: id });
  }

  private list() {
    this._branchOfficesServices
      .list()
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeListModel) => {
          if (resp.ok == 'OK') {
            this.branchOfficeListData = resp.data;
          }
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
  }
}
