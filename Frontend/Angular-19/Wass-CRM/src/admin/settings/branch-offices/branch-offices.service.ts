import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BRANCHOFFICES_URL } from '@core/config/config';
import { emptyBranchOffice, emptyBranchOfficeList } from '@core/default-data';
import {
  BranchOfficeCrtUptModel,
  BranchOfficeDeleteModel,
  BranchOfficeModel,
  BranchOfficeList,
  BranchOffice,
  BranchOfficeRetrieveModel,
} from '@core/models';
import { BaseService } from '@core/services';
import { formData } from '@shared/utils/convert';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficesService extends BaseService {
  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  private readonly isLoadingSignal = signal<boolean>(false);
  readonly isLoading: Signal<boolean> = computed(() => this.isLoadingSignal());
  private readonly bracnhOfficesLst = signal<BranchOfficeList>(emptyBranchOfficeList);
  private readonly bracnhOfficesPage = signal<BranchOfficeList>(emptyBranchOfficeList);
  private readonly branchOfficeData = signal<BranchOffice>(emptyBranchOffice);
  readonly branchOfficesList: Signal<BranchOfficeList> = computed(() => this.bracnhOfficesLst());
  readonly branchOfficesPagination: Signal<BranchOfficeList> = computed(() => this.bracnhOfficesPage());
  readonly branchOffice: Signal<BranchOffice> = computed(() => this.branchOfficeData());
  // private readonly nextPageSignal: WritableSignal<string> = signal<string>('');
  // private readonly previousPageSignal: WritableSignal<string> = signal<string>('');
  // private readonly countSignal: WritableSignal<number> = signal<number>(0);
  // private readonly pagesSignal: WritableSignal<number> = signal<number>(0);
  // private readonly msgSignal: WritableSignal<string> = signal<string>('');
  // readonly nextPage: Signal<string> = computed(() => this.nextPageSignal());
  // readonly previousPage: Signal<string> = computed(() => this.previousPageSignal());
  // readonly count: Signal<number> = computed(() => this.countSignal());
  // readonly pages: Signal<number> = computed(() => this.pagesSignal());
  // readonly msg: Signal<string> = computed(() => this.msgSignal());

  public list(): Observable<BranchOfficeList> {
    this.isLoadingSignal.set(true);

    let branchOfficesList: Observable<BranchOfficeList> = this.httpClient.get<BranchOfficeList>(BRANCHOFFICES_URL).pipe(
      tap((response: BranchOfficeList) => {
        if (response.ok === 'OK') {
          this.bracnhOfficesLst.set(response);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );
    return branchOfficesList;
  }

  public listPagination(page: number, page_size: string): Observable<BranchOfficeList> {
    this.isLoadingSignal.set(true);

    let branchOfficesList = this.httpClient.get<BranchOfficeList>(`${BRANCHOFFICES_URL}list_pagination/?page=${page}&page_size=${page_size}`).pipe(
      tap((response: BranchOfficeList) => {
        if (response.ok === 'OK') {
          this.bracnhOfficesPage.set(response);
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
      .get<BranchOfficeRetrieveModel>(`${BRANCHOFFICES_URL}${id}/`)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesRetrieve;
  }

  public create(data: BranchOfficeModel): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    const frmData: FormData = formData(data);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .post<BranchOfficeCrtUptModel>(BRANCHOFFICES_URL, frmData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesCreate;
  }

  public partial_update(id: string, data: BranchOfficeModel): Observable<BranchOfficeCrtUptModel> {
    this.isLoadingSubject.next(true);
    const frmData = formData(data);
    let branchOfficesCreate: Observable<BranchOfficeCrtUptModel> = this.httpClient
      .patch<BranchOfficeCrtUptModel>(`${BRANCHOFFICES_URL}${id}/`, frmData)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesCreate;
  }

  public delete(id: string): Observable<BranchOfficeDeleteModel> {
    this.isLoadingSubject.next(true);
    let branchOfficesDelete: Observable<BranchOfficeDeleteModel> = this.httpClient
      .delete<BranchOfficeDeleteModel>(`${BRANCHOFFICES_URL}${id}/`)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesDelete;
  }
}
