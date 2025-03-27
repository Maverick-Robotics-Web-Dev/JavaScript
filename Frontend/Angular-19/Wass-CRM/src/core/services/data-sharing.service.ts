import { computed, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  // private dataShare: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // public dataShare$: Observable<any> = this.dataShare.asObservable();

  private readonly dataShareSignal = signal<any>(null);
  readonly dataShare = computed(() => this.dataShareSignal());

  // public setDataShare(data: any) {
  //   this.dataShare.next(data);
  // }

  public setDataShare(data: any) {
    this.dataShareSignal.set(data);
  }
}
