import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationComponentsService {
  private communicationData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public comunicationData$: Observable<any> = this.communicationData.asObservable();

  public setCommunicationData(data: any) {
    this.communicationData.next(data);
  }
}
