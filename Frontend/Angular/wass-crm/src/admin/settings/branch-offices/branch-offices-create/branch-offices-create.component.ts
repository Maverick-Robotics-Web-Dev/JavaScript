import { Component, DestroyRef, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchOfficesService } from '../branch-offices.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficeCrtUptModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { formData } from '@shared/utils/convert';

@Component({
  selector: 'comp-branch-offices-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './branch-offices-create.component.html',
  styleUrl: './branch-offices-create.component.scss',
})
export class BranchOfficesCreateComponent implements OnInit {
  @Input() modalState: boolean = false;
  @Output() showModal: EventEmitter<any> = new EventEmitter<any>();

  private _branchOfficesServices = inject(BranchOfficesService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchForm!: FormGroup;
  public inputText: string = 'Ningun archivo seleccionado';
  public error!: HttpErrorResponse;

  ngOnInit(): void {
    this.branchForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postal_code: [''],
      city: ['', [Validators.required]],
      state_province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      cellphone_number: ['', [Validators.required]],
      email: [''],
      phone_number: [''],
      img: new FormControl<File | string | null>(null),
    });
  }

  public closeModal(): void {
    this.showModal.emit({ close: false });
  }

  public fileChange(e: Event) {
    let target = e.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.inputText = target.value;
      this.branchForm.patchValue({ img: target.files[0] });
    }

    // if (target.files && target.files.length > 0) {
    //   console.log(target.files[0]);
    //   await fileToBase64(target.files[0])
    //     .then((res: string) => console.log(res))
    //     .catch((error) => console.log(error));
    // }
  }

  public createBranch(e: Event) {
    e.preventDefault();

    this._branchOfficesServices
      .create(this.branchForm.value)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeCrtUptModel) => {
          if (resp.ok) {
            this.branchForm.reset();
            this.showModal.emit({ close: false, resp: resp.ok });
          }
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
  }
}
