import { NgClass } from '@angular/common';
import { Component, computed, effect, inject, OnInit, ResourceRef, Signal, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { createComponentAnimations } from '../branch-offices-animation';
import { BranchOfficesService } from '../branch-offices.service';
import { DataSharingService } from '@core/services';
import { BranchOffice, BranchOfficeModel } from '@core/models';
import { emptyBranchOfficeModel } from '@core/default-data';
import { rxResource } from '@angular/core/rxjs-interop';
import { NEVER } from 'rxjs';
import { ModalSuccessComponent } from '@shared/components/modal-success';

@Component({
  selector: 'comp-branch-offices-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, ModalSuccessComponent],
  templateUrl: './branch-offices-update.component.html',
  styleUrl: './branch-offices-update.component.scss',
  animations: [createComponentAnimations],
})
export class BranchOfficesUpdateComponent implements OnInit {
  private _branchOfficesServices = inject(BranchOfficesService);
  private _dataSharingService = inject(DataSharingService);
  private branchOfficeResource!: ResourceRef<BranchOffice | undefined>;
  private branchOfficeUpdateResource!: ResourceRef<BranchOffice | undefined>;
  private _formBuilder: FormBuilder = inject(FormBuilder);

  public dataShare = this._dataSharingService.dataShare;
  public branchOfficesGetById = this._branchOfficesServices.branchOfficesGetById;
  public branchOffice: Signal<BranchOffice> = this._branchOfficesServices.branchOfficeUpdate;
  public branchOfficesData: Signal<BranchOfficeModel> = computed(
    () => this._branchOfficesServices.branchOfficesGetById().data ?? emptyBranchOfficeModel
  );
  public branchForm!: FormGroup;
  public branchOfficeData: WritableSignal<BranchOfficeModel> = signal<BranchOfficeModel>(emptyBranchOfficeModel);
  public id = signal<string>('');
  public message = signal<string>('');
  public modalStatus = signal<boolean>(false);
  public imgName = signal<File | string | null | undefined>('No se a seleccionado ningun archivo.');

  constructor() {
    this.branchOfficeResource = rxResource({
      request: () => this.id(),
      loader: ({ request: id }) => (id == '' ? NEVER : this._branchOfficesServices.getById(this.id())),
    });

    this.branchOfficeUpdateResource = rxResource({
      request: () => this.branchOfficeData(),
      loader: ({ request: branchOffice }) =>
        branchOffice == emptyBranchOfficeModel ? NEVER : this._branchOfficesServices.partial_update(this.id(), branchOffice),
    });

    effect(() => {
      if (this.dataShare()) {
        if (this.dataShare().openUpdate == true) {
          this.id.set(this.dataShare().id);
          this.modalStatus.set(this.dataShare().openUpdate);
        }

        if (this.dataShare().closeUpdate == false) {
          this.modalStatus.set(this.dataShare().closeUpdate);
        }
      }
    });

    effect(() => {
      if (this.branchOfficesData() != emptyBranchOfficeModel) {
        const imgNamePath: string | undefined = this.branchOfficesData().img?.toString();
        let imgIndex: number | undefined = 0;
        let imgName: string | undefined = '';

        if (imgNamePath?.indexOf('/', 28) !== -1) {
          imgIndex = imgNamePath?.indexOf('/', 28) ?? 0;
          imgName = imgNamePath?.substring(imgIndex + 1);
          this.imgName.set(imgName);
        } else {
          imgName = imgNamePath?.substring(28);
          this.imgName.set(imgName);
        }
        this.branchForm.patchValue(this.branchOfficesData());
      }
    });

    effect(() => {
      if (this.branchOffice().msg) {
        this.message.set(this.branchOffice().msg ?? '');
        this._dataSharingService.setDataShare({ success: true, form: 'closeUpdate' });
      }
    });
  }

  ngOnInit(): void {
    this.branchForm = this.createForm();
  }

  private createForm(): FormGroup {
    let frm: FormGroup = this._formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      postal_code: '',
      city: ['', [Validators.required]],
      state_province: ['', [Validators.required]],
      country: ['', [Validators.required]],
      cellphone_number: ['', [Validators.required]],
      email: '',
      phone_number: '',
      img: File,
    });

    return frm;
  }

  public closeModal(): void {
    this._dataSharingService.setDataShare({ closeUpdate: false });
  }

  public fileChange(files: FileList | null): void {
    if (files && files.length > 0) {
      this.imgName.set(files[0].name);
      this.branchForm.patchValue({ img: files[0] });
    }
  }

  public updateBranch(e: Event) {
    e.preventDefault();

    if (!(this.branchForm.value.img instanceof File)) {
      const { img, ...values } = this.branchForm.value;
      this.branchOfficeData.set(values);
    } else {
      this.branchOfficeData.set(this.branchForm.value);
    }
  }
}
