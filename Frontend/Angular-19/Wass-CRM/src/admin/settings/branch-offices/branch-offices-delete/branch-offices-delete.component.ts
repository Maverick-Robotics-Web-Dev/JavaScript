import { Component, effect, inject, ResourceRef, signal, Signal } from '@angular/core';
import { createComponentAnimations } from '../branch-offices-animation';
import { BranchOffice } from '@core/models';
import { DataSharingService } from '@core/services';
import { BranchOfficesService } from '../branch-offices.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';

@Component({
  selector: 'comp-branch-offices-delete',
  standalone: true,
  imports: [],
  templateUrl: './branch-offices-delete.component.html',
  styleUrl: './branch-offices-delete.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesDeleteComponent {
  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private branchOfficeDeleteResource!: ResourceRef<BranchOffice | undefined>;
  public dataShare = this._dataSharingService.dataShare;
  public branchOfficeDelete: Signal<BranchOffice> = this._branchOfficesServices.branchOfficeDelete;
  public id = signal<string>('');
  public message = signal<string>('');
  public modalStatus = signal<boolean>(false);
  public success = signal<boolean>(false);

  constructor() {
    this.branchOfficeDeleteResource = rxResource({
      request: () => this.id(),
      loader: ({ request: id }) => (id == '' ? NEVER : this._branchOfficesServices.delete(this.id())),
    });

    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().openDelete == true) {
          this.modalStatus.set(this.dataShare().openDelete);
        }

        if (this.dataShare().closeDelete == false) {
          this.modalStatus.set(this.dataShare().closeDelete);
        }
      }
    });

    effect(() => {
      if (this.branchOfficeDelete().msg) {
        this.message.set(this.branchOfficeDelete().msg ?? '');
        this.success.set(true);
      }
    });
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeDelete: false });
  }

  public closeModalSuccess() {
    this.success.set(false);
    this._dataSharingService.setDataShare({ closeDelete: false, resp: 'OK' });
  }

  public deleteBranch(e: Event) {
    e.preventDefault();
    console.log(this.dataShare().id);
    this.id.set(this.dataShare().id);
  }
}
