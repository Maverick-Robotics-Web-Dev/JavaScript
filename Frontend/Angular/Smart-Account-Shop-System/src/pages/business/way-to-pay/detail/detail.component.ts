import { JsonPipe } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WayToPayService } from '@services/index';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [JsonPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  @Input() id!: string;
  public _apirestService: WayToPayService = inject(WayToPayService);

  ngOnInit(): void {
    this.getWaytoPay();
  }

  private getWaytoPay() {
    this._apirestService.retrieve(this.id);
  }
}
