import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WayToPayService } from '@services/index';
import { AsyncPipe, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [JsonPipe, AsyncPipe],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  public _apirestService: WayToPayService = inject(WayToPayService);
  private _router: Router = inject(Router);

  ngOnInit(): void {
    this.getList();
  }

  private getList(): void {
    this._apirestService.list();
  }

  public retrieve(e: Event, id: number) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay/detail', id]);
  }

  public create(e: Event) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay/create']);
  }

  public update(e: Event, id: number) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay/update', id]);
  }
}
