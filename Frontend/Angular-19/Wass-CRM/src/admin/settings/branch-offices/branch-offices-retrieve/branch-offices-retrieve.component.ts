import { Component, computed, DestroyRef, effect, inject, Input, OnInit, ResourceRef, Signal, signal } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { DataSharingService } from '@core/services';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BranchOffice, BranchOfficeModel } from '@core/models';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { emptyBranchOfficeModel } from '@core/default-data';

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
  public branchOfficeResource!: ResourceRef<BranchOffice | undefined>;
  public dataShare = this._dataSharingService.dataShare;
  public loading = this._branchOfficesServices.isLoading;
  public branchOfficesGetById = this._branchOfficesServices.bracnhOfficesGetById;
  public branchOfficesData = computed(() => this._branchOfficesServices.bracnhOfficesGetById().data ?? emptyBranchOfficeModel);
  public id = signal<string>('');
  public modalStatus = signal<boolean>(false);
  // public error!: HttpErrorResponse;

  constructor() {
    this.branchOfficeResource = rxResource({
      request: () => this.id(),
      loader: () => this._branchOfficesServices.getById(this.id()),
    });
    effect(() => {});
  }

  ngOnInit(): void {
    // this.sharingData();
    // this.loading = this._branchOfficesServices.isLoading$;
  }

  // private sharingData() {
  //   this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe({
  //     next: (data: any) => {
  //       if (data != null) {
  //         if (data.openRetrieve == true) {
  //           this.id = data.id;
  //           this.retrieve();
  //           this.modalStatus = data.openRetrieve;
  //         }

  //         if (data.closeRetrieve == false) {
  //           this.modalStatus = data.closeRetrieve;
  //         }

  //         if (data.id) {
  //           this.id = data.id;
  //           this.retrieve();
  //         }
  //       }
  //     },
  //   });
  // }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeRetrieve: false });
  }

  // private retrieve() {
  //   this._branchOfficesServices
  //     .getById(this.id)
  //     .pipe(takeUntilDestroyed(this._destroy))
  //     .subscribe({
  //       next: (resp: any) => {
  //         if (resp.ok == 'OK') {
  //           if (resp.data) {
  //             this.branchOfficeRetrieveData = resp.data;
  //           }
  //         }
  //       },
  //       error: (err) => {
  //         this.error = err;
  //         console.log(err);
  //       },
  //     });
  // }
}
