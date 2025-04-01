import { Component, computed, DestroyRef, effect, inject, Input, OnInit, ResourceRef, Signal, signal } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { DataSharingService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { NEVER, Observable } from 'rxjs';
import { BranchOffice, BranchOfficeModel } from '@core/models';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { emptyBranchOfficeModel } from '@core/default-data';
import { createComponentAnimations } from '../branch-offices-animation';

@Component({
  selector: 'comp-branch-offices-retrieve',
  standalone: true,
  imports: [],
  templateUrl: './branch-offices-retrieve.component.html',
  styleUrl: './branch-offices-retrieve.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesRetrieveComponent implements OnInit {
  // @Input() id!: string;

  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  public branchOfficeResource!: ResourceRef<BranchOffice | undefined>;
  public dataShare = this._dataSharingService.dataShare;
  public loading = this._branchOfficesServices.isLoading;
  public branchOfficesGetById = this._branchOfficesServices.branchOfficesGetById;
  public branchOfficesData = computed(() => this._branchOfficesServices.branchOfficesGetById().data ?? emptyBranchOfficeModel);
  public id = signal<string>('');
  public modalStatus = signal<boolean>(false);
  // public error!: HttpErrorResponse;

  constructor() {
    this.branchOfficeResource = rxResource({
      request: () => this.id(),
      loader: ({ request: id }) => (id == '' ? NEVER : this._branchOfficesServices.getById(this.id())),
    });

    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().openDetail == true) {
          this.id.set(this.dataShare().id);
          this.modalStatus.set(this.dataShare().openDetail);
        }

        if (this.dataShare().closeDetail == false) {
          this.modalStatus.set(this.dataShare().closeDetail);
        }
      }
    });
  }

  ngOnInit(): void {}

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeDetail: false });
  }
}
