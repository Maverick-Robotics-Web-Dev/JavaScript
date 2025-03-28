import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchOfficesService } from '../branch-offices.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficeCrtUptModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalSuccessComponent } from '@shared/components/modal-success';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { NgClass } from '@angular/common';

@Component({
  selector: 'comp-branch-offices-create',
  standalone: true,
  imports: [ReactiveFormsModule, ModalSuccessComponent, NgClass],
  templateUrl: './branch-offices-create.component.html',
  styleUrl: './branch-offices-create.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesCreateComponent implements OnInit {
  private _branchOfficesServices = inject(BranchOfficesService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchForm!: FormGroup;
  public message: string | undefined = '';
  public error!: HttpErrorResponse;
  public modalStatus: boolean = false;

  ngOnInit(): void {
    this.branchForm = this.createForm();
    this.sharingData();
  }

  private sharingData() {
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe((data) => {
      if (data != null) {
        if (data.openCreate == true) {
          this.branchForm.reset();
          this.modalStatus = data.openCreate;
        }
        if (data.closeCreate == false) {
          this.modalStatus = data.closeCreate;
        }
      }
    });
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeCreate: false });
  }

  public fileChange(e: Event) {
    let target = e.target as HTMLInputElement;

    if (target.files && target.files.length > 0) {
      this.branchForm.patchValue({ img: target.files[0] });
    }

    // if (target.files && target.files.length > 0) {
    //   console.log(target.files[0]);
    //   await fileToBase64(target.files[0])
    //     .then((res: string) => console.log(res))
    //     .catch((error) => console.log(error));
    // }
  }

  private createForm(): FormGroup {
    let frm: FormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postal_code: [''],
      city: ['', [Validators.required]],
      state_province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      cellphone_number: ['', [Validators.required]],
      email: [''],
      phone_number: [''],
      img: new FormControl<File | string | null>('empty'),
    });

    return frm;
  }

  public createBranch(e: Event) {
    e.preventDefault();

    this._branchOfficesServices
      .create(this.branchForm.value)
      .pipe(takeUntilDestroyed(this._destroy))
      .subscribe({
        next: (resp: BranchOfficeCrtUptModel) => {
          if (resp.ok == 'OK') {
            this.message = resp.msg;
            this._dataSharingService.setDataShare({ success: true });
          }
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
  }
}
