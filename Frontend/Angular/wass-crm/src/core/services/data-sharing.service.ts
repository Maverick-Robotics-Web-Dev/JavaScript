import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private dataShare: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public dataShare$: Observable<any> = this.dataShare.asObservable();

  public setDataShare(data: any) {
    this.dataShare.next(data);
  }
}
