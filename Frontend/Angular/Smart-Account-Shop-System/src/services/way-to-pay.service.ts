import { HttpErrorResponse } from '@angular/common/http';
import { computed, DestroyRef, inject, Injectable, Signal, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { WaytoPayCRU, WaytoPayDel, WaytoPayInputData, WaytoPayRAll } from '@interfaces/business';
import { defaultState, SignalState } from '@interfaces/signals';
import { BaseService } from '@shared/services';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WayToPayService extends BaseService {
  private businessURL: string = `${this.apiBaseURL}/business/way-to-pay/`;
  private _destroy: DestroyRef = inject(DestroyRef);
  // private _router: Router = inject(Router);
  private listWaytoPay = signal<SignalState>(defaultState);
  public retrieveWaytoPay = signal<SignalState>(defaultState);
  public createWaytoPay = signal<SignalState>(defaultState);
  public updateWaytoPay = signal<SignalState>(defaultState);
  public deleteWaytoPay = signal<SignalState>(defaultState);
  public listData = computed(() => this.listWaytoPay());
  public retrievetData = computed(() => this.retrieveWaytoPay());
  public createData = computed(() => this.createWaytoPay());
  public updateData = computed(() => this.updateWaytoPay());
  public deleteData = computed(() => this.deleteWaytoPay());

  constructor() {
    super();
  }

  public list(): void {
    this.httpClient
      .get<WaytoPayRAll>(this.businessURL)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: WaytoPayRAll) => {
          if (resp.ok) {
            if (resp.msg) {
              this.listWaytoPay.set({ data: resp.data, msg: resp.msg, status: 'success', error: {} });
            }
            this.listWaytoPay.set({ data: resp.data, status: 'success', error: {} });
          }
        },
        error: (err) => {
          if (err instanceof Error) {
            console.log(`Error ${err}`);
            this.listWaytoPay.set({ data: [], status: 'error', error: err });
          }
          if (err instanceof HttpErrorResponse) {
            // const error = { error: err.error, status: err.status, text: err.statusText, url: err.url };
            this.listWaytoPay.set({ data: [], status: 'error', error: err });
          }
        },
      });
  }

  public retrieve(id: string): void {
    this.httpClient
      .get<WaytoPayCRU>(`${this.businessURL}${id}`)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: WaytoPayCRU) => {
          if (resp.ok) {
            if (resp.msg) {
              this.retrieveWaytoPay.set({ data: resp.data, msg: resp.msg, status: 'success', error: {} });
            } else {
              this.retrieveWaytoPay.set({ data: resp.data, status: 'success', error: {} });
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            console.log(`Error ${err}`);
            this.retrieveWaytoPay.set({ data: {}, status: 'error', error: err });
          }
          if (err instanceof HttpErrorResponse) {
            // const error = { error: err.error, status: err.status, text: err.statusText, url: err.url };
            this.retrieveWaytoPay.set({ data: {}, status: 'error', error: err });
          }
        },
      });
  }

  public create(data: WaytoPayInputData, waytopayForm: FormGroup): void {
    this.httpClient
      .post<WaytoPayCRU>(`${this.businessURL}`, data)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: WaytoPayCRU) => {
          if (resp.ok) {
            if (resp.msg) {
              this.createWaytoPay.set({ data: resp.data, msg: resp.msg, status: 'success', error: {} });
            } else {
              this.createWaytoPay.set({ data: resp.data, status: 'success', error: {} });
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            console.log(`Error ${err}`);
            this.createWaytoPay.set({ data: {}, status: 'error', error: err });
          }
          if (err instanceof HttpErrorResponse) {
            // const error = { error: err.error, status: err.status, text: err.statusText, url: err.url };
            this.createWaytoPay.set({ data: {}, status: 'error', error: err });
          }
        },
      });
  }

  public partial_update(id: string, data: WaytoPayInputData): void {
    this.httpClient
      .patch<WaytoPayCRU>(`${this.businessURL}${id}/`, data)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: WaytoPayCRU) => {
          if (resp.ok) {
            if (resp.msg) {
              this.updateWaytoPay.set({ data: resp.data, msg: resp.msg, status: 'success', error: {} });
            } else {
              this.updateWaytoPay.set({ data: resp.data, status: 'success', error: {} });
            }
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            console.log(`Error ${err}`);
            this.updateWaytoPay.set({ data: {}, status: 'error', error: err });
          }
          if (err instanceof HttpErrorResponse) {
            this.updateWaytoPay.set({ data: {}, status: 'error', error: err });
          }
        },
      });
  }

  public delete(id: string): void {
    this.httpClient
      .delete<WaytoPayDel>(`${this.businessURL}${id}/`)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: WaytoPayDel) => {
          if (resp.ok) {
            this.deleteWaytoPay.set({ data: {}, msg: resp.msg, status: 'success', error: {} });
          }
        },
        error: (err: HttpErrorResponse) => {
          if (err instanceof Error) {
            console.log(`Error ${err}`);
            this.deleteWaytoPay.set({ data: {}, status: 'error', error: err });
          }
          if (err instanceof HttpErrorResponse) {
            this.deleteWaytoPay.set({ data: {}, status: 'error', error: err });
          }
        },
      });
  }

  // public getState() {
  //   let listData: Signal<any> = computed(() => this.listWaytoPay().data);
  //   let retrievetData: Signal<any> = computed(() => this.retrieveWaytoPay().data);
  //   console.log(listData());
  //   console.log(retrievetData());

  //   // let msg: Signal<string | undefined> = computed(() => this.state().msg);
  //   // let status: Signal<string> = computed(() => this.state().status);
  //   // let error: Signal<any> = computed(() => this.state().error);
  //   return { listData, retrievetData };
  // }
}
