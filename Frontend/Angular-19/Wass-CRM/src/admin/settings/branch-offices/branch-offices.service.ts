import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BRANCHOFFICES_URL } from '@core/config/config';
import { emptyBranchOffice, emptyBranchOfficeList, emptyBranchOfficeModel } from '@core/default-data';
import { BranchOfficeModel, BranchOfficeList, BranchOffice } from '@core/models';
import { BaseService } from '@core/services';
import { formData } from '@shared/utils/convert';
import { BehaviorSubject, finalize, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BranchOfficesService extends BaseService {
  public isLoadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  private readonly isLoadingSignal: WritableSignal<boolean> = signal<boolean>(false);
  readonly isLoading: Signal<boolean> = computed(() => this.isLoadingSignal());
  private readonly branchOfficesGetAllSignal: WritableSignal<BranchOfficeList> = signal<BranchOfficeList>(emptyBranchOfficeList);
  readonly branchOfficesGetAll: Signal<BranchOfficeList> = computed(() => this.branchOfficesGetAllSignal());
  private readonly branchOfficesGetAllPagesSignal: WritableSignal<BranchOfficeList> = signal<BranchOfficeList>(emptyBranchOfficeList);
  readonly branchOfficesGetAllPages: Signal<BranchOfficeList> = computed(() => this.branchOfficesGetAllPagesSignal());
  private readonly branchOfficesGetByIdSignal: WritableSignal<BranchOffice> = signal<BranchOffice>(emptyBranchOffice);
  readonly branchOfficesGetById: Signal<BranchOffice> = computed(() => this.branchOfficesGetByIdSignal());
  private readonly branchOfficeCreateSignal: WritableSignal<BranchOffice> = signal<BranchOffice>(emptyBranchOffice);
  readonly branchOfficeCreate: Signal<BranchOffice> = computed(() => this.branchOfficeCreateSignal());
  private readonly branchOfficeUpdateSignal: WritableSignal<BranchOffice> = signal<BranchOffice>(emptyBranchOffice);
  readonly branchOfficeUpdate: Signal<BranchOffice> = computed(() => this.branchOfficeUpdateSignal());
  private readonly branchOfficeDeleteSignal: WritableSignal<BranchOffice> = signal<BranchOffice>(emptyBranchOffice);
  readonly branchOfficeDelete: Signal<BranchOffice> = computed(() => this.branchOfficeDeleteSignal());

  public getall(): Observable<BranchOfficeList> {
    this.isLoadingSignal.set(true);

    let branchOfficesList: Observable<BranchOfficeList> = this.httpClient.get<BranchOfficeList>(`${BRANCHOFFICES_URL}/`).pipe(
      tap((response: BranchOfficeList) => {
        if (response.ok === 'OK') {
          this.branchOfficesGetAllSignal.set(response);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );
    return branchOfficesList;
  }

  public getAllPagination(page: number, page_size: string): Observable<BranchOfficeList> {
    this.isLoadingSignal.set(true);

    let branchOfficesList: Observable<BranchOfficeList> = this.httpClient
      .get<BranchOfficeList>(`${BRANCHOFFICES_URL}/list_pagination/?page=${page}&page_size=${page_size}`)
      .pipe(
        tap((response: BranchOfficeList) => {
          if (response.ok === 'OK') {
            this.branchOfficesGetAllPagesSignal.set(response);
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

  public getById(id: string): Observable<BranchOffice> {
    this.isLoadingSignal.set(true);
    let branchOfficesRetrieve: Observable<BranchOffice> = this.httpClient.get<BranchOffice>(`${BRANCHOFFICES_URL}/${id}/`).pipe(
      tap((response: BranchOffice) => {
        if (response.ok == 'OK') {
          this.branchOfficesGetByIdSignal.set(response);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );

    return branchOfficesRetrieve;
  }

  public create(data: BranchOfficeModel): Observable<BranchOffice> {
    this.isLoadingSignal.set(true);
    const frmData: FormData = formData(data);
    let branchOfficesCreate: Observable<BranchOffice> = this.httpClient.post<BranchOffice>(`${BRANCHOFFICES_URL}/`, frmData).pipe(
      tap((response: BranchOffice) => {
        if (response.ok == 'OK') {
          this.branchOfficeCreateSignal.set(response);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );

    return branchOfficesCreate;
  }

  public partial_update(id: string, data: BranchOfficeModel): Observable<BranchOffice> {
    this.isLoadingSignal.set(true);
    const frmData = formData(data);

    let branchOfficesUpdate: Observable<BranchOffice> = this.httpClient.patch<BranchOffice>(`${BRANCHOFFICES_URL}/${id}/`, frmData).pipe(
      tap((response: BranchOffice) => {
        if (response.ok == 'OK') {
          this.branchOfficeUpdateSignal.set(response);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );

    return branchOfficesUpdate;
  }

  public delete(id: string): Observable<BranchOffice> {
    this.isLoadingSubject.next(true);
    let branchOfficesDelete: Observable<BranchOffice> = this.httpClient
      .delete<BranchOffice>(`${BRANCHOFFICES_URL}${id}/`)
      .pipe(finalize(() => this.isLoadingSubject.next(false)));

    return branchOfficesDelete;
  }
}
