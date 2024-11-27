import { Injectable } from '@angular/core';
import { BranchOfficeListModel } from '@core/models/settings';
import { BaseService } from '@core/services';
import { BehaviorSubject, finalize, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficesService extends BaseService {
  private BASE_URL: string = `${this.RESTAPI_URL}/settings/branch-offices/`;
  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  public list(): Observable<BranchOfficeListModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesList: Observable<BranchOfficeListModel> = this.httpClient
      .get<BranchOfficeListModel>(this.BASE_URL)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesList;
  }
}
