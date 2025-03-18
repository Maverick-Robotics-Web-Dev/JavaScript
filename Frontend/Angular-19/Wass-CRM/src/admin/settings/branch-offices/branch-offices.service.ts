import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { emptyBranchOffice, emptyBranchOfficeResponse, emptyBranchOfficeResponseList } from '@core/default-data';
import {
  BranchOfficeCrtUptModel,
  BranchOfficeDeleteModel,
  BranchOffice,
  BranchOfficeResponseList,
  BranchOfficeResponse,
  BranchOfficeRetrieveModel,
} from '@core/models';
import { BaseService } from '@core/services';
import { formData } from '@shared/utils/convert';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficesService extends BaseService {
  private BASE_URL: string = `${this.RESTAPI_URL}/settings/branch-offices/`;
  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  private readonly isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);
  readonly isLoading: Signal<boolean> = computed(() => this.isLoadingSignal());
  private readonly bracnhOfficesListSignal: WritableSignal<BranchOfficeResponseList> =
    signal<BranchOfficeResponseList>(emptyBranchOfficeResponseList);
  private readonly branchOfficeSignal: WritableSignal<BranchOfficeResponse> = signal<BranchOfficeResponse>(emptyBranchOfficeResponse);
  // private readonly nextPageSignal: WritableSignal<string> = signal<string>('');
  // private readonly previousPageSignal: WritableSignal<string> = signal<string>('');
  // private readonly countSignal: WritableSignal<number> = signal<number>(0);
  // private readonly pagesSignal: WritableSignal<number> = signal<number>(0);
  // private readonly msgSignal: WritableSignal<string> = signal<string>('');
  readonly branchOfficesList: Signal<BranchOfficeResponseList> = computed(() => this.bracnhOfficesListSignal());
  readonly branchOffice: Signal<BranchOfficeResponse> = computed(() => this.branchOfficeSignal());
  // readonly nextPage: Signal<string> = computed(() => this.nextPageSignal());
  // readonly previousPage: Signal<string> = computed(() => this.previousPageSignal());
  // readonly count: Signal<number> = computed(() => this.countSignal());
  // readonly pages: Signal<number> = computed(() => this.pagesSignal());
  // readonly msg: Signal<string> = computed(() => this.msgSignal());

  public list() {
    this.isLoadingSignal.set(true);

    let branchOfficesList: Observable<BranchOfficeResponseList> = this.httpClient.get<BranchOfficeResponseList>(this.BASE_URL).pipe(
      tap((response: BranchOfficeResponseList) => {
        if (response.ok === 'OK') {
          console.log(response);
          this.bracnhOfficesListSignal.set(response);
          // this.nextPageSignal.set(response.next ?? '');
          // this.previousPageSignal.set(response.previous ?? '');
          // this.countSignal.set(response.count ?? 0);
          // this.pagesSignal.set(response.pages ?? 0);
          // this.msgSignal.set(response.msg ?? '');
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

  public create(data: BranchOffice): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    const frmData: FormData = formData(data);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .post<BranchOfficeCrtUptModel>(this.BASE_URL, frmData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesCreate;
  }

  public partial_update(id: string, data: BranchOffice): Observable<BranchOfficeCrtUptModel> {
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
