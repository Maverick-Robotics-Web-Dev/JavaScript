import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from '@shared/components/list';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeListModel, BranchOfficeModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { ModalSuccessComponent } from '@shared/components/modal-success';
import { CommunicationComponentsService } from '@core/services';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [ListComponent, BranchOfficesCreateComponent, ModalSuccessComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
})
export class BranchOfficesListComponent implements OnInit {
  private _branchOfficesServices = inject(BranchOfficesService);
  private _communiCompServices = inject(CommunicationComponentsService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOfficeModel[];
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public modalSwitch: boolean = false;

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading$;
    this.list();
    // console.log(this._communiCompServices.get);
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
        },
      });
  }

  public openModal(state: boolean) {
    this.modalSwitch = state;
  }

  public closeModal(state: any) {
    this.modalSwitch = state.close;
    if (state.resp == 'OK') {
      this.list();
    }
  }
}
