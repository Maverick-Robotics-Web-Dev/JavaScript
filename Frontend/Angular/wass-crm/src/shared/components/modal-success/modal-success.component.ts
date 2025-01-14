import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DataSharingService } from '@core/services';

@Component({
  selector: 'comp-modal-success',
  standalone: true,
  imports: [],
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.scss',
})
export class ModalSuccessComponent {
  @Input({ required: true }) data!: any;
  @Input({ required: true }) message!: string;
  @Output() showModalSuccess: EventEmitter<any> = new EventEmitter<any>();

  private _dataSharingService = inject(DataSharingService);

  closeModalSuccess() {
    this._dataSharingService.setDataShare(this.data);
  }
}
