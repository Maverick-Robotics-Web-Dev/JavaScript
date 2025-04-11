import { ChangeDetectionStrategy, Component, computed, DestroyRef, effect, inject, OnInit, ResourceRef, signal, Signal } from '@angular/core';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeList } from '@core/models';
import { rxResource } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { BranchOfficesRetrieveComponent } from '../branch-offices-retrieve';
import { NgClass } from '@angular/common';
import { ceil } from '@shared/utils/round';
import { BranchOfficesUpdateComponent } from '../branch-offices-update';
import { BranchOfficesDeleteComponent } from '../branch-offices-delete';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [NgClass, BranchOfficesCreateComponent, BranchOfficesRetrieveComponent, BranchOfficesUpdateComponent, BranchOfficesDeleteComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
  animations: [createComponentAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BranchOfficesListComponent {
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  private _branchOfficesServices = inject(BranchOfficesService);
  private branchOfficeResource!: ResourceRef<BranchOfficeList | undefined>;

  public dataShare = this._dataSharingService.dataShare;
  public branchOfficesListPagination: Signal<BranchOfficeList> = this._branchOfficesServices.branchOfficesGetAllPages;
  public branchOfficesData = computed(() => this._branchOfficesServices.branchOfficesGetAllPages().data ?? []);
  public pages = computed(() => this._branchOfficesServices.branchOfficesGetAllPages().pages ?? 0);
  public currentPage = computed(() => this._branchOfficesServices.branchOfficesGetAllPages().current ?? 0);
  public records = computed(() => this._branchOfficesServices.branchOfficesGetAllPages().count ?? 0);
  public page = signal<number>(1);
  public page_size = signal<string>('10');
  public pagesArray!: number[];

  constructor() {
    this.branchOfficeResource = rxResource({
      request: () => (this.page(), this.page_size()),
      loader: () => this._branchOfficesServices.getAllPagination(this.page(), this.page_size()),
    });

    effect(() => {
      if (this.pages()) {
        this.pagesArray = new Array(this.pages());
        for (let i = 0; i < this.pagesArray.length; i++) {
          this.pagesArray[i] = i + 1;
        }
      }
    });

    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().resp == 'OK') {
          this.branchOfficeResource.reload();
        }
      }
    });
  }

  public openCreate() {
    this._dataSharingService.setDataShare({ openCreate: true });
  }

  public openDetail(id: number) {
    this._dataSharingService.setDataShare({ openDetail: true, id: id });
  }

  public openUpdate(id: number) {
    this._dataSharingService.setDataShare({ openUpdate: true, id: id });
  }

  public openDelete(id: number) {
    this._dataSharingService.setDataShare({ openDelete: true, id: id });
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

  public getSelect(select: string) {
    // if (this.pages() == this.page()) {
    //   let result = ceil(this.records(), parseInt(select.value));

    //   if (result != this.pages()) {
    //     this.page.set(result);
    //   }
    // }
    this.page.set(1);
    this.page_size.set(select);
  }
}
