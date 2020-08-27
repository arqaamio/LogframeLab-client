import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { APIError } from 'src/app/models/apierror.model';
import { ClientError } from 'src/app/models/clienterror.model';

@Injectable({ providedIn: 'root' })
export class DefaultInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!req.headers.has('Content-Type') && !(req.body instanceof FormData)) {
      req = req.clone({
        setHeaders: {
          'Content-Type': 'application/json'
        }
      });
    }
    return next.handle(req)
      .pipe(
        // retry(1),
        catchError((err: HttpErrorResponse) => {
          let error: ClientError = new ClientError();
          error.object = err;
          
          // API error
          if (err.error != null && err.error.hasOwnProperty('exception')) {
            let errorCast: APIError = err.error;
            error.message = errorCast.message;
            error.timestamp = errorCast.timestamp;
          // client-side error
          } else if (err.error instanceof ErrorEvent) {
            error.message = 'An unexpected error occurred.';
          } else {
            // server-side error
            error.message = 'An unexpected error occurred on the server.';
          }
          return throwError(error);
        })
      );
  }

}
