import { ChangeDetectionStrategy, Component, effect, inject, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WayToPayService } from '@services/index';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { SuccessComponent } from '@shared/components/success';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [JsonPipe, AsyncPipe, SuccessComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent implements OnInit {
  public _apirestService: WayToPayService = inject(WayToPayService);
  private _router: Router = inject(Router);
  private timeOut!: any;

  constructor() {
    effect(
      () => {
        if (this._apirestService.deleteData().status == 'success') {
          this.getWaytoPays();
          this.timeOut = setTimeout(() => {
            this._apirestService.deleteWaytoPay.set({ data: {}, msg: '', status: '', error: {} });
            clearInterval(this.timeOut);
          }, 1200);
        }
      },
      { allowSignalWrites: true }
    );
  }

  ngOnInit(): void {
    this.getWaytoPays();
  }

  public getWaytoPays(): void {
    this._apirestService.list();
    // this._apirestService.deleteWaytoPay.set({ data: {}, msg: '', status: '', error: {} });
  }

  public getWaytoPay(e: Event, id: number) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay/detail', id]);
  }

  public createWaytoPay(e: Event) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay/create']);
  }

  public updateWaytoPay(e: Event, id: number) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay/update', id]);
  }

  public deleteWaytoPay(e: Event, id: string) {
    e.preventDefault();
    this._apirestService.delete(id);
  }
}
