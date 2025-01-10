import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunicationComponentsService {
  private sendData: any = null;

  public setCommunicationData(data: any) {
    this.sendData = data;
    console.log(this.sendData);
  }

  public getCommunicationData() {
    return this.sendData;
  }

  // private communicationData: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  // public comunicationData$: Observable<any> = this.communicationData.asObservable();

  // public setCommunicationData(data: any) {
  //   this.communicationData.next(data);
  // }

  // public getCommunicationData() {
  //   return this.communicationData.getValue();
  // }
}
