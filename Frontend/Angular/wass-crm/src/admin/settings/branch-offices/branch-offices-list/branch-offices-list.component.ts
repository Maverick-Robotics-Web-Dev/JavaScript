import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from '@shared/components/list';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeListModel, BranchOfficeModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { ModalSuccessComponent } from '@shared/components/modal-success';
import { DataSharingService } from '@core/services';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [ListComponent, BranchOfficesCreateComponent, ModalSuccessComponent, AsyncPipe],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchOfficesListComponent implements OnInit {
  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOfficeModel[];
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public modalSwitch: boolean = false;

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading$;
    this.sharingData();
    this.list();
  }

  public list() {
    this._branchOfficesServices
      .list()
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeListModel) => {
          if (resp.ok) {
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
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe((data) => {
      if (data != null) {
        this.modalSwitch = data.close;
        if (data.resp == 'OK') {
          this.list();
        }
      }
    });
  }

  public openModal(state: boolean) {
    this.modalSwitch = state;
  }

  public closeModal() {
    // this.modalSwitch = state.close;
    // if (state.resp == 'OK') {
    //   this.list();
    // }
  }
}
