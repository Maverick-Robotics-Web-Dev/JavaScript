import { computed, Injectable, Signal, signal, WritableSignal } from '@angular/core';
import { BRANCHOFFICES_URL } from '@core/config/config';
import { emptyBranchOffice, emptyBranchOfficeList, emptyBranchOfficeModel } from '@core/default-data';
import { BranchOfficeCrtUptModel, BranchOfficeDeleteModel, BranchOfficeModel, BranchOfficeList, BranchOffice } from '@core/models';
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
  private readonly bracnhOfficesGetAllSignal = signal<BranchOfficeList>(emptyBranchOfficeList);
  readonly bracnhOfficesGetAll: Signal<BranchOfficeList> = computed(() => this.bracnhOfficesGetAllSignal());
  private readonly bracnhOfficesGetAllPageSignal = signal<BranchOfficeList>(emptyBranchOfficeList);
  readonly branchOfficesGetAllPagination: Signal<BranchOfficeList> = computed(() => this.bracnhOfficesGetAllPageSignal());
  private readonly bracnhOfficesGetByIdSignal = signal<BranchOffice>(emptyBranchOffice);
  readonly bracnhOfficesGetById = computed(() => this.bracnhOfficesGetByIdSignal());

  public getall(): Observable<BranchOfficeList> {
    this.isLoadingSignal.set(true);

    let branchOfficesList: Observable<BranchOfficeList> = this.httpClient.get<BranchOfficeList>(`${BRANCHOFFICES_URL}/`).pipe(
      tap((response: BranchOfficeList) => {
        if (response.ok === 'OK') {
          this.bracnhOfficesGetAllSignal.set(response);
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
            this.bracnhOfficesGetAllPageSignal.set(response);
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
          this.bracnhOfficesGetByIdSignal.set(response);
        }
      }),
      finalize(() => this.isLoadingSignal.set(false))
    );

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
