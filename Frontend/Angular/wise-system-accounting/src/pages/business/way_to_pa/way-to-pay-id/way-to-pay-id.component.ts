import { Component, Input, OnInit, inject } from '@angular/core';
import { WaytoPayRModel } from '../../../../models/business/way-to-pay';
import { EMPTY, Observable, catchError } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { WayToPayService } from '../../../../services/business';

@Component({
  selector: 'app-way-to-pay-id',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './way-to-pay-id.component.html',
  styleUrl: './way-to-pay-id.component.css',
})
export class WayToPayIdComponent implements OnInit {
  @Input() id!: string;
  public waytopay$!: Observable<WaytoPayRModel>;
  private _apirestService: WayToPayService = inject(WayToPayService);
  private _router: Router = inject(Router);
  public httpError!: HttpErrorResponse;

  ngOnInit(): void {
    this.waytopay$ = this._apirestService.retrieve(this.id).pipe(
      catchError((error: HttpErrorResponse) => {
        this.httpError = error;
        return EMPTY;
      })
    );
  }

  backMain() {
    this._router.navigate(['/way-to-pay']);
  }
}
