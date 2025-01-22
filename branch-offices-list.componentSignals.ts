import { Component, DestroyRef, effect, inject, OnInit, Signal } from '@angular/core';
import { ListComponent } from '@shared/components/list';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeListModel, BranchOfficeModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [ListComponent, BranchOfficesCreateComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesListComponent implements OnInit {
  public _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOfficeModel[];
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public dta!: BranchOfficeModel[] | undefined;

  constructor() {
    effect(() => {
      if (this._branchOfficesServices.loadingRead() == false) {
        this.getData(this._branchOfficesServices.stateRead());
      }
    });
  }

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading$;
    this.list();
    this.listSignal();
    this.sharingData();
  }

  public getData(data: any) {
    if (data.ok == 'OK') {
      console.log(data);
    }
  }

  public list() {
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

  public sharingData() {
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

  public listSignal() {
    this._branchOfficesServices.listSignal();
  }
}
