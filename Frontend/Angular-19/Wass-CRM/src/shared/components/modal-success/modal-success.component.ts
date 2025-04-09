import { Component, effect, inject, Input, signal } from '@angular/core';
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
export class ModalSuccessComponent {
  @Input({ required: true }) message!: string | undefined;

  private _dataSharingService = inject(DataSharingService);
  private formType = signal<string>('');
  public dataShare = this._dataSharingService.dataShare;
  public success = signal<boolean>(false);

  constructor() {
    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().success == true) {
          this.success.set(this.dataShare().success);
          this.formType.set(this.dataShare().form);
        }
        if (this.dataShare().success == false) {
          this.success.set(this.dataShare().success);
        }
      }
    });
  }

  closeModalSuccess() {
    this._dataSharingService.setDataShare({ this.formType(): false, success: false, resp: 'OK' });
  }
}
