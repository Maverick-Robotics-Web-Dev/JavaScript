import { AsyncPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public openModal() {
    this.showModal.emit(true);
  }
}
