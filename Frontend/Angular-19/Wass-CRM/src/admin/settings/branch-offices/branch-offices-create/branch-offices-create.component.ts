import { Component, computed, effect, inject, OnInit, ResourceRef, signal, Signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BranchOfficesService } from '../branch-offices.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BranchOffice, BranchOfficeModel } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { ModalSuccessComponent } from '@shared/components/modal-success';
import { DataSharingService } from '@core/services';
import { createComponentAnimations } from '../branch-offices-animation';
import { NgClass } from '@angular/common';
import { NEVER } from 'rxjs';
import { emptyBranchOfficeModel } from '@core/default-data';

@Component({
  selector: 'comp-branch-offices-create',
  standalone: true,
  imports: [ReactiveFormsModule, ModalSuccessComponent, NgClass],
  templateUrl: './branch-offices-create.component.html',
  styleUrl: './branch-offices-create.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesCreateComponent implements OnInit {
  private _branchOfficesServices: BranchOfficesService = inject(BranchOfficesService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private _dataSharingService: DataSharingService = inject(DataSharingService);
  public branchOfficeResource!: ResourceRef<BranchOffice | undefined>;
  public dataShare: Signal<any> = this._dataSharingService.dataShare;
  public message: Signal<string> = computed(() => this._branchOfficesServices.branchOfficeCreate().msg ?? '');
  public branchOfficeData: WritableSignal<BranchOfficeModel> = signal<BranchOfficeModel>(emptyBranchOfficeModel);
  public modalStatus: WritableSignal<boolean> = signal<boolean>(false);
  public branchForm!: FormGroup;
  public error!: HttpErrorResponse;

  constructor() {
    this.branchOfficeResource = rxResource({
      request: () => this.branchOfficeData(),
      loader: ({ request: branchOffice }) => (branchOffice == emptyBranchOfficeModel ? NEVER : this._branchOfficesServices.create(branchOffice)),
    });

    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().openCreate == true) {
          this.branchForm.reset();
          // this.branchOfficeData.set(emptyBranchOfficeModel);
          this.modalStatus.set(this.dataShare().openCreate);
        }
        if (this.dataShare().closeCreate == false) {
          this.modalStatus.set(this.dataShare().closeCreate);
        }
      }
    });
  }

  ngOnInit(): void {
    this.branchForm = this.createForm();
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeCreate: false });
  }

  public fileChange(files: FileList | null) {

    if (files && files.length > 0) {
      this.branchForm.patchValue({ img: files[0] });
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
      img: new FormControl<File | string | null>(''),
    });

    return frm;
  }

  public createBranch(e: Event) {
    e.preventDefault();
    if (this.branchForm.value['img'] == null) {
      this.branchForm.patchValue({ img: '' });
    }
    this.branchOfficeData.set(this.branchForm.value);
    this._dataSharingService.setDataShare({ success: true });
  }
}
