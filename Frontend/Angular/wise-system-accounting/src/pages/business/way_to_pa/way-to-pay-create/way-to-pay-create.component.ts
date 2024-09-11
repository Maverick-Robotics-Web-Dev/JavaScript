import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaytoPayInputData } from '../../../../models/business';
import { WayToPayService } from '../../../../services/business';
import { EMPTY, catchError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-way-to-pay-create',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe],
  templateUrl: './way-to-pay-create.component.html',
  styleUrl: './way-to-pay-create.component.css',
})
export class WayToPayCreateComponent implements OnInit {
  private _apirestService: WayToPayService = inject(WayToPayService);
  private _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private waytopayData!: WaytoPayInputData;
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public waytopayForm!: FormGroup;
  public httpError!: HttpErrorResponse;

  ngOnInit(): void {
    this.waytopayForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      fk_user_employee: ['', [Validators.required]],
    });
  }

  public backMain() {
    this._router.navigate(['/way-to-pay']);
  }

  public backCreate() {
    this._router.navigate(['/way-to-pay/create']);
  }

  public waytopayCreate(e: Event) {
    e.preventDefault();

    this.waytopayData = this.waytopayForm.value;
    this._apirestService
      .create(this.waytopayData)
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
