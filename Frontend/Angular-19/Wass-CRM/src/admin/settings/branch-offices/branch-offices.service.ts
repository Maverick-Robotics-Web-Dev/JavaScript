import { computed, Injectable, signal, WritableSignal } from '@angular/core';
import {
  BranchOfficeCrtUptModel,
  BranchOfficeDeleteModel,
  BranchOfficeListModel,
  BranchOfficeModel,
  BranchOfficeResponseModel,
  BranchOfficeRetrieveModel,
} from '@core/models/settings';
import { BaseService } from '@core/services';
import { formData } from '@shared/utils/convert';
import { BehaviorSubject, EMPTY, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficesService extends BaseService {
  private BASE_URL: string = `${this.RESTAPI_URL}/settings/branch-offices/`;
  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  private readonly isLoadingSignal = signal<boolean>(false);
  readonly isLoading = computed(() => this.isLoadingSignal());
  private readonly bracnhOfficesSignal: WritableSignal<BranchOfficeResponseModel> = signal<BranchOfficeResponseModel>({});
  readonly branchOffices = computed(() => this.bracnhOfficesSignal());

  public list() {
    this.isLoadingSignal.set(true);

    let branchOfficesList: Observable<BranchOfficeResponseModel> = this.httpClient.get<BranchOfficeResponseModel>(this.BASE_URL).pipe(
      tap((response: BranchOfficeResponseModel) => {
        if (response.ok === 'OK') {
          console.log(response);
          const { ok, data, ...res } = response;
          const arrayData = [data];
          res = arrayData;
          this.bracnhOfficesSignal.set(res);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );
    return branchOfficesList;
  }
  // public list(): Observable<BranchOfficeListModel> {
  //   this.isLoadingSubject.next(true);
  //   let branchOfficesList: Observable<BranchOfficeListModel> = this.httpClient
  //     .get<BranchOfficeListModel>(this.BASE_URL)
  //     .pipe(finalize(() => this.isLoadingSubject.next(false)));
  //   return branchOfficesList;
  // }

  public retrieve(id: string): Observable<BranchOfficeRetrieveModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesRetrieve: Observable<BranchOfficeRetrieveModel> = this.httpClient
      .get<BranchOfficeRetrieveModel>(`${this.BASE_URL}${id}/`)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesRetrieve;
  }

  public create(data: BranchOfficeModel): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    const frmData: FormData = formData(data);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .post<BranchOfficeCrtUptModel>(this.BASE_URL, frmData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesCreate;
  }

  public partial_update(id: string, data: BranchOfficeModel): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    const frmData = formData(data);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .patch<BranchOfficeCrtUptModel>(`${this.BASE_URL}${id}/`, frmData)
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
