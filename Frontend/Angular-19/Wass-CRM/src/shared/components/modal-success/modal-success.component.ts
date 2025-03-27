import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { DataSharingService } from '@core/services';
import { modalSuccessComponentAnimations } from './modal-success-animations';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public success: boolean = false;

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
