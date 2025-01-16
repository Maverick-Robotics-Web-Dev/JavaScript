import { Component, DestroyRef, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchOfficesService } from '../branch-offices.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BranchOfficeCrtUptModel } from '@core/models/settings';
import { HttpErrorResponse } from '@angular/common/http';
import { formData } from '@shared/utils/convert';
import { ModalSuccessComponent } from '@shared/components/modal-success';
import { DataSharingService } from '@core/services';
import { NgClass } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { createComponentAnimations } from '../branch-offices-animation';

@Component({
  selector: 'comp-branch-offices-create',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ModalSuccessComponent],
  templateUrl: './branch-offices-create.component.html',
  styleUrl: './branch-offices-create.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesCreateComponent implements OnInit {
  @Output() showModal: EventEmitter<any> = new EventEmitter<any>();

  private _branchOfficesServices = inject(BranchOfficesService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _dataSharingService = inject(DataSharingService);
  private readonly _destroy: DestroyRef = inject(DestroyRef);
  public branchForm!: FormGroup;
  public inputText: string = 'Ningun archivo seleccionado';
  public dataSend!: any;
  public message: string = '';
  public error!: HttpErrorResponse;
  public success: string = '';
  public modalStatus: boolean = false;

  ngOnInit(): void {
    this.branchForm = this.createForm();
    this.sharingData();
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ close: false });
  }

  public testButton() {
    this._dataSharingService.setDataShare({ resp: 'OK' });
  }

  public sharingData() {
    this._dataSharingService.dataShare$.pipe(takeUntilDestroyed(this._destroy)).subscribe((data) => {
      if (data != null) {
        if (data.open == true) {
          this.modalStatus = data.open;
          console.log(this.modalStatus);
        }
        if (data.close == false) {
          this.modalStatus = data.close;
          console.log(this.modalStatus);
        }
      }
    });
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
      img: new FormControl<File | string | null>(null),
    });

    return frm;
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
            this.success = resp.ok;
            this.message = resp.msg;
            this.dataSend = { close: false, resp: resp.ok };
          }
        },
        error: (err) => {
          this.error = err;
          console.log(err);
        },
      });
  }
}
