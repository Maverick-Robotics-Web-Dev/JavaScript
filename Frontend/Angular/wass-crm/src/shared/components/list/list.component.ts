import { AsyncPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { DataSharingService } from '@core/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'comp-list',
  standalone: true,
  imports: [NgClass, AsyncPipe],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input({ required: true }) data!: any[];
  @Input({ required: true }) state!: Observable<boolean>;

  private _dataSharingService = inject(DataSharingService);

  public openModal() {
    this._dataSharingService.setDataShare({ openCreate: true });
  }

  public getId(id: string) {
    this._dataSharingService.setDataShare({ openRetrieve: true, id: id });
  }
}
