import { Component, DestroyRef, inject, Injector, OnInit, ResourceRef, runInInjectionContext, Signal } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOffice, BranchOfficeList } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { BranchOfficesRetrieveComponent } from '../branch-offices-retrieve';
import { AsyncPipe, NgClass } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [NgClass, BranchOfficesCreateComponent, BranchOfficesRetrieveComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesListComponent implements OnInit {
  // private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOffice[];
  public error!: HttpErrorResponse;
  // public loading!: Observable<boolean>;

  private injectorApp = inject(Injector);
  private _branchOfficesServices = inject(BranchOfficesService);
  public branchOfficeResource!: ResourceRef<BranchOfficeList | undefined>;
  public branchOfficesList!: Signal<BranchOfficeList>;
  public branchOfficesListPagination: Signal<BranchOfficeList> = this._branchOfficesServices.branchOfficesPagination;
  public loading!: Signal<boolean>;

  // constructor() {
  //   this.branchOfficeResource = rxResource({ loader: () => this._branchOfficesServices.list() });
  // }

  ngOnInit(): void {
    // this.loading = this._branchOfficesServices.isLoading$;
    this.loading = this._branchOfficesServices.isLoading;
    this.getList();
    // this.list();
    this.pagination(1);
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

  public openCreate() {
    this._dataSharingService.setDataShare({ openCreate: true });
  }

  public getId(id: number) {
    this._dataSharingService.setDataShare({ openRetrieve: true, id: id });
  }

  private list() {
    runInInjectionContext(this.injectorApp, () => {
      rxResource({ loader: () => this._branchOfficesServices.list() });
    });
  }

  private pagination(page: number) {
    runInInjectionContext(this.injectorApp, () => {
      rxResource({ loader: () => this._branchOfficesServices.listPagination(page) });
    });
  }

  public getList() {
    this.branchOfficesList = this._branchOfficesServices.branchOfficesList;
  }

  // private list() {
  //   this._branchOfficesServices
  //     .list()
  //     .pipe(takeUntilDestroyed(this._destroy))
  //     .subscribe({
  //       next: (resp: BranchOfficeListModel) => {
  //         if (resp.ok == 'OK') {
  //           this.branchOfficeListData = resp.data;
  //         }
  //       },
  //       error: (err) => {
  //         this.error = err;
  //         console.log(err);
  //       },
  //     });
  // }
}
