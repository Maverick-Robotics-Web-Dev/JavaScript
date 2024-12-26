import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ListComponent } from '@shared/components/list';
import { BranchOfficesService } from '../branch-offices.service';
import { BranchOfficeListModel, BranchOfficeModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficesCreateComponent } from '../branch-offices-create';

@Component({
  selector: 'comp-branch-offices-list',
  standalone: true,
  imports: [ListComponent, BranchOfficesCreateComponent],
  templateUrl: './branch-offices-list.component.html',
  styleUrl: './branch-offices-list.component.scss',
})
export class BranchOfficesListComponent implements OnInit {
  private _branchOfficesServices = inject(BranchOfficesService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchOfficeListData!: BranchOfficeModel[];
  public error!: HttpErrorResponse;
  public loading!: Observable<boolean>;
  public modalSwitch: boolean = false;
  public data = [
    {
      name: 'Sant Extreanet Solution',
      description: 'HTML, JS, ReactJS',
      price: '$2,790',
      paid: 'Paid',
      deposit: '$520',
      condition: 'Rejected',
      agent: 'Bradly Beal',
      position: 'Insurance',
      status: 'Approved',
    },
    {
      name: 'Telegram Development',
      description: 'C#, ASP.NET, MS SQL',
      price: '$4,790',
      paid: 'Paid',
      deposit: '$240',
      condition: 'Rejected',
      agent: 'Chris Thompson',
      position: 'NBA Player',
      status: 'In Progress',
    },
    {
      name: 'Payroll Application',
      description: 'PHP, Laravel, VueJS',
      price: '$4,390',
      paid: 'Paid',
      deposit: '$593',
      condition: 'Rejected',
      agent: 'Zoey McGee',
      position: 'Ruby Developer',
      status: 'Success',
    },
    {
      name: 'HR Management System',
      description: 'Python, PostgreSQL, ReactJS',
      price: '$7,990',
      paid: 'Paid',
      deposit: '$980',
      condition: 'Rejected',
      agent: 'Brandon Ingram',
      position: 'Insurance',
      status: 'Rejected',
    },
    {
      name: 'Telegram Mobile',
      description: 'HTML, JS, ReactJS',
      price: '$5,790',
      paid: 'Paid',
      deposit: '$750',
      condition: 'Rejected',
      agent: 'Natali Trump',
      position: 'Insurance',
      status: 'Warning',
    },
  ];

  ngOnInit(): void {
    this.loading = this._branchOfficesServices.isLoading$;
    console.log(this.loading);

    this.list();
  }

  public list() {
    this._branchOfficesServices
      .list()
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeListModel) => {
          if (resp.ok) {
            this.branchOfficeListData = resp.data;
          }
        },
        error: (err) => {
          this.error = err;
        },
      });
  }

  public openModal(state: boolean) {
    this.modalSwitch = state;
  }

  public closeModal(state: boolean) {
    this.modalSwitch = state;
  }
}
