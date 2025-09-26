import { HttpInterceptorFn } from '@angular/common/http';
import { catchError, pipe, throwError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((err) => {
      console.log('error inceptor', err);
      return throwError(() => err);
    })
  );
};
