import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

function handleError(httpError: HttpErrorResponse): Observable<never> {
  return throwError(() => httpError);
}

export const serverErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  return next(req).pipe(catchError(handleError));
};
