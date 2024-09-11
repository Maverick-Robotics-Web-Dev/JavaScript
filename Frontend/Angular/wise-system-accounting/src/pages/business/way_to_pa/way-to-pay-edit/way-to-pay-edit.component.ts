import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { EMPTY, Observable, catchError } from 'rxjs';
import { WayToPayService } from '@services/business';
import { WaytoPayInputData, WaytoPayOutputData } from '@models/business';

@Component({
  selector: 'app-way-to-pay-edit',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './way-to-pay-edit.component.html',
  styleUrl: './way-to-pay-edit.component.css',
})
export class WayToPayEditComponent implements OnInit {
  @Input() id!: string;
  private _apirestService: WayToPayService = inject(WayToPayService);
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  private waytopayData!: WaytoPayInputData;
  public waytopayForm!: FormGroup;
  public waytopayDataFill!: WaytoPayOutputData;
  public httpError!: HttpErrorResponse;
  public loading: boolean = false;

  ngOnInit(): void {
    this.waytopayForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      // fk_user_employee: ['', Validators.required],
    });

    if (this.id) {
      this._apirestService
        .retrieve(this.id)
        .pipe(takeUntilDestroyed(this._destroy))
        .subscribe({
          next: (response) => {
            if (response.ok) {
              this.waytopayDataFill = response.data;
              this.waytopayForm.patchValue(this.waytopayDataFill);
              this.loading = true;
            }
          },
          error: (error: HttpErrorResponse) => {
            console.log(error);
            this.httpError = error;
          },
        });
    }
  }

  public backMain() {
    this._router.navigate(['/way-to-pay']);
  }

  public waytopayEdit(e: Event) {
    e.preventDefault();

    this.waytopayData = this.waytopayForm.value;
    this._apirestService
      .partial_update(this.id, this.waytopayData)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (response) => {
          if (response.ok) {
            this.waytopayForm.reset();
            this._router.navigate(['/way-to-pay']);
          }
        },
        error: (error: HttpErrorResponse) => {
          this.httpError = error;
        },
      });
  }
}
