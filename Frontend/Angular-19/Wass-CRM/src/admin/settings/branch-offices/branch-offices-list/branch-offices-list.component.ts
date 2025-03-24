import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  Injector,
  OnInit,
  ResourceRef,
  runInInjectionContext,
  signal,
  Signal,
} from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOffice, BranchOfficeList } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { BranchOfficesRetrieveComponent } from '../branch-offices-retrieve';
import { AsyncPipe, JsonPipe, NgClass } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [NgClass, BranchOfficesCreateComponent, BranchOfficesRetrieveComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
  animations: [createComponentAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchOfficesListComponent implements OnInit {
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);

  private _branchOfficesServices = inject(BranchOfficesService);
  public branchOfficeResource!: ResourceRef<BranchOfficeList | undefined>;
  public branchOfficesListPagination: Signal<BranchOfficeList> = this._branchOfficesServices.branchOfficesPagination;
  public loading!: Signal<boolean>;
  // public loading = signal<boolean>(true);
  public page = signal<number>(1);
  // public currentPage = computed(() => this.branchOfficeResource.value()?.current ?? 0);
  // public records = computed(() => this.branchOfficeResource.value()?.count ?? 0);
  public pages = computed(() => this.branchOfficesListPagination().pages ?? 0);
  public pagesArray!: number[];

  constructor() {
    this.branchOfficeResource = rxResource({
      request: () => this.page(),
      loader: () => this._branchOfficesServices.listPagination(this.page()),
    });

    // this.loading = this.branchOfficeResource.isLoading;

    effect(() => {
      if (this.pages()) {
        this.pagesArray = new Array(this.pages());
        for (let i = 0; i < this.pagesArray.length; i++) {
          this.pagesArray[i] = i + 1;
        }
        console.log(this.pagesArray);
      }
      //   if (this.branchOfficeResource.hasValue()) {
      //     let pgs = Array.from({ length: this.pages() }, (_, i) => i + 1);
      //     console.log(pgs);
      //   }
      //   if (this.branchOfficeResource.value()?.pages == this.pageSg()) {
      //     console.log('Hello World');
      //     console.log(this.pages());
      //   }
    });
  }

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading;
    this.sharingData();
  }

  private sharingData() {
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe({
      next: (data: any) => {
        if (data != null) {
          if (data.resp == 'OK') {
            // this.list();
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

  public nextPage() {
    this.page.update((page) => page + 1);
  }

  public previousPage() {
    this.page.update((page) => page - 1);
  }

  public setPage(page: number) {
    this.page.set(page);
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
