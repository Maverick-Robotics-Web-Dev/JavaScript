import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from '@shared/components/list';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeListModel, BranchOfficeModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { ModalSuccessComponent } from '@shared/components/modal-success';
import { CommunicationComponentsService } from '@core/services';
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
  public _communiCompServices = inject(CommunicationComponentsService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOfficeModel[];
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public modalSwitch: boolean = false;
  public communicationData!: any;

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading$;
    this.list();
  }

  public changeDetection() {
    if (this._communiCompServices.getCommunicationData() != null) {
      console.log(this._communiCompServices.getCommunicationData());
    }
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

  public closeModal() {
    // this.modalSwitch = state.close;
    // if (state.resp == 'OK') {
    //   this.list();
    // }
  }
}
