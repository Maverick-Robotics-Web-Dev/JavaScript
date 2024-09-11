import { JsonPipe } from '@angular/common';
import { Component, effect, inject, Input, input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { WaytoPayInputData, WaytoPayOutputData } from '@interfaces/business';
import { WayToPayService } from '@services/way-to-pay.service';
import { SuccessComponent } from '@shared/components/success';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, SuccessComponent],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit {
  @Input() id!: string;
  public _apirestService: WayToPayService = inject(WayToPayService);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  private waytopayData!: WaytoPayInputData;
  public waytopayForm!: FormGroup;

  constructor() {
    effect(() => {
      if (this._apirestService.retrievetData().status == 'success') {
        this.waytopayForm.patchValue(this._apirestService.retrievetData().data);
      }
    });
  }

  ngOnInit(): void {
    this._apirestService.updateWaytoPay.set({ data: {}, msg: '', status: '', error: {} });
    this.getWaytoPay();
    this.createForm();
  }

  private createForm(): void {
    this.waytopayForm = this._formBuilder.group({
      name: ['', Validators.required],
      description: [''],
      // fk_user_employee: ['', Validators.required],
    });
  }

  private getWaytoPay(): void {
    this._apirestService.retrieve(this.id);
  }

  public updateWaytoPay(e: Event) {
    e.preventDefault();
    this.waytopayData = this.waytopayForm.value;
    this._apirestService.partial_update(this.id, this.waytopayData);
  }
}
