import { Component, effect, inject, Input, OnInit, signal } from '@angular/core';
import { DataSharingService } from '@core/services';
import { modalSuccessComponentAnimations } from './modal-success-animations';

@Component({
  selector: 'comp-modal-success',
  standalone: true,
  imports: [],
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.scss',
  animations: [modalSuccessComponentAnimations],
})
export class ModalSuccessComponent implements OnInit {
  @Input({ required: true }) message!: string | undefined;

  private _dataSharingService = inject(DataSharingService);
  public dataShare = this._dataSharingService.dataShare;
  public success = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().success == true) {
          this.success.set(this.dataShare().success);
        }
        if (this.dataShare().success == false) {
          this.success.set(this.dataShare().success);
        }
      }
    });
  }

  ngOnInit(): void {
    // this.sharingData();
  }

  closeModalSuccess() {
    this._dataSharingService.setDataShare({ closeCreate: false, success: false, resp: 'OK' });
  }

  // public sharingData() {
  //   this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe((data) => {
  //     if (data != null) {
  //       if (data.success == true) {
  //         this.success = data.success;
  //       }
  //       if (data.success == false) {
  //         this.success = data.success;
  //       }
  //     }
  //   });
  // }
}
