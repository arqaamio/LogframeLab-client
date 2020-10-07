import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs/internal/Observable';
import {catchError} from 'rxjs/operators';
import {NzMessageService} from 'ng-zorro-antd/message';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Injectable()
export class InvalidJwtInterceptor implements HttpInterceptor {

  constructor(private message: NzMessageService, private authService: AuthenticationService, private router: Router) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error && error.status === 401) {
          this.message.error('Your session is expired!');
          this.authService.logout();
          this.router.navigate(['/login']).then(() => false);
        }

        return throwError(error);
      })
    );
  }
}
