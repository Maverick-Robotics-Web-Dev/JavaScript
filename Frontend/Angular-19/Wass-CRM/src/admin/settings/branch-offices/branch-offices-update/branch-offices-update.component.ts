import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'comp-branch-offices-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './branch-offices-update.component.html',
  styleUrl: './branch-offices-update.component.scss',
})
export class BranchOfficesUpdateComponent implements OnInit {
  private _formBuilder: FormBuilder = inject(FormBuilder);
  public branchForm!: FormGroup;

  ngOnInit(): void {
    this.branchForm = this.createForm();
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

  public closeModal() {}

  public updateBranch(e: Event) {}
}
