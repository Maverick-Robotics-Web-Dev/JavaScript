import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'comp-list',
  standalone: true,
  imports: [NgClass],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  @Input({ required: true }) data!: any[];
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  public openModal() {
    this.showModal.emit(true);
  }
}
