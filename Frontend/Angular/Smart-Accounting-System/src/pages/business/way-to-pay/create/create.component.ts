import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { WaytoPayInputData } from '@interfaces/business';
import { WayToPayService } from '@services/way-to-pay.service';

@Component({
  selector: 'app-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
})
export class CreateComponent implements OnInit {
  public _apirestService: WayToPayService = inject(WayToPayService);
  public _router: Router = inject(Router);
  private _formBuilder: FormBuilder = inject(FormBuilder);
  public waytopayForm!: FormGroup;
  private waytopayData!: WaytoPayInputData;

  ngOnInit(): void {
    this.waytopayForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      description: [''],
      fk_user_employee: ['', [Validators.required]],
    });
    this._apirestService.createWaytoPay.set({ data: {}, msg: '', status: '', error: {} });
  }

  public backMain(e: Event) {
    e.preventDefault();
    this._router.navigate(['/admin/way-to-pay']);
  }

  public createNew(e: Event) {
    e.preventDefault();
    this.waytopayData = this.waytopayForm.value;
    this._apirestService.create(this.waytopayData, this.waytopayForm);
  }
}
