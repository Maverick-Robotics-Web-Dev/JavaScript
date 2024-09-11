import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

function handleError(httpError: HttpErrorResponse): Observable<never> {
  console.log(httpError);

  return throwError(() => httpError);
}

export const errorHandlerInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const nextError: Observable<HttpEvent<unknown>> = next(req).pipe(catchError(handleError));

  return nextError;
};
