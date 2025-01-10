import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommunicationComponentsService } from '@core/services';

@Component({
  selector: 'comp-modal-success',
  standalone: true,
  imports: [],
  templateUrl: './modal-success.component.html',
  styleUrl: './modal-success.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalSuccessComponent {
  @Input({ required: true }) data!: any;
  @Input() message!: string;
  @Output() showModalSuccess: EventEmitter<any> = new EventEmitter<any>();

  private _communiCompServices = inject(CommunicationComponentsService);

  closeModalSuccess() {
    this._communiCompServices.setCommunicationData(this.data);
  }
}
