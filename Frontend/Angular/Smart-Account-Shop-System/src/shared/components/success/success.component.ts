import { Component, inject, input, InputSignal, model, ModelSignal, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [],
  templateUrl: './success.component.html',
  styleUrl: './success.component.scss',
})
export class SuccessComponent implements OnInit {
  private timeOut!: any;
  private timeOutModal!: any;
  private _router: Router = inject(Router);
  public title: InputSignal<string> = input.required();
  public msg: InputSignal<string | undefined> = input.required();
  public state: ModelSignal<boolean> = model.required();
  public urlRoute: InputSignal<string | undefined> = input();
  // public status: WritableSignal<boolean> = signal(false);

  ngOnInit(): void {
    // this.status.set(this.state());
    // this.status.set(true);
    // console.log(this.status());
    this.closeWindow();
  }

  private closeWindow(): void {
    if (this.urlRoute()) {
      this.timeOut = setTimeout(() => {
        this._router.navigate(['/admin/way-to-pay/']);
      }, 1500);
    } else {
      this.timeOutModal = setTimeout(() => {
        this.state.set(false);
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.timeOutModal);
    clearInterval(this.timeOut);
  }
}
