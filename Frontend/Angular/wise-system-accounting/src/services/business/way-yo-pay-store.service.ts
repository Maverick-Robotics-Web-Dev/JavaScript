import { DestroyRef, Injectable, OnInit, Signal, WritableSignal, computed, inject, signal } from '@angular/core';
import { WaytoPayRAllModel, waytopayEmptyAll } from '@models/business';
import { StateData } from '@models/business/way-to-pay';
import { WayToPayService } from './way-to-pay.service';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class WayYoPayStoreService {
  private _apirestService: WayToPayService = inject(WayToPayService);
  private _destroy: DestroyRef = inject(DestroyRef);
  // dataList: WritableSignal<WaytoPayRAllModel> = signal(waytopayEmptyAll);
  // error: WritableSignal<any> = signal({});
  // dataList!: WaytoPayRAllModel;
  // public error!: HttpErrorResponse;
  // state: WritableSignal<StateData> = signal({ data: [], status: '' });
  #state = signal<StateData>({ data: waytopayEmptyAll, status: 'loading' });
  data = computed(() => this.#state().data);
  status = computed(() => this.#state().status);

  constructor() {
    this.getAll();
  }

  getData() {
    let data = computed(() => this.#state().data);
    return data;
  }

  getStatus() {
    let status = computed(() => this.#state().status);
    return status;
  }

  getAll() {
    this._apirestService
      .list()
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (data: WaytoPayRAllModel) => {
          this.#state.set({ data, status: 'success' });
        },
        error: (err: HttpErrorResponse) => {
          this.#state.set({ data: err, status: 'error' });
        },
      });
  }
}
