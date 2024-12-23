import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'comp-branch-offices-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './branch-offices-create.component.html',
  styleUrl: './branch-offices-create.component.scss',
})
export class BranchOfficesCreateComponent implements OnInit {
  @Input() modalState: boolean = false;
  @Output() showModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _formBuilder: FormBuilder = inject(FormBuilder);
  public branchForm!: FormGroup;
  public inputText: string = 'Ningun archivo seleccionado';

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
      img: [''],
    });
  }

  public closeModal(): void {
    this.showModal.emit(false);
  }

  public fileChange() {
    console.log(this.branchForm.get('img')?.value);
    this.inputText = this.branchForm.get('img')?.value;
  }

  public createBranch(e: Event) {
    e.preventDefault();

    console.log(this.branchForm.value);
  }
}
