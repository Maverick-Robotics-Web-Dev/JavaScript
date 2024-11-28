import { Injectable } from '@angular/core';
import {
  BranchOfficeCrtUptModel,
  BranchOfficeDeleteModel,
  BranchOfficeListModel,
  BranchOfficeModel,
  BranchOfficeRetrieveModel,
} from '@core/models/settings';
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

  public retrieve(id: string): Observable<BranchOfficeRetrieveModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesRetrieve: Observable<BranchOfficeRetrieveModel> = this.httpClient
      .get<BranchOfficeRetrieveModel>(`${this.BASE_URL}${id}/`)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesRetrieve;
  }

  public create(data: BranchOfficeModel): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .post<BranchOfficeCrtUptModel>(this.BASE_URL, data)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesCreate;
  }

  public partial_update(id: string, data: BranchOfficeModel): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .patch<BranchOfficeCrtUptModel>(`${this.BASE_URL}${id}/`, data)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesCreate;
  }

  public delete(id: string): Observable<BranchOfficeDeleteModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesDelete: Observable<BranchOfficeDeleteModel> = this.httpClient
      .delete<BranchOfficeDeleteModel>(`${this.BASE_URL}${id}/`)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesDelete;
  }
}
