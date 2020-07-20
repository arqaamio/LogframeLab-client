import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable({providedIn: 'root'})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jwt = this.authenticationService.jwt$.value;
    if (jwt) {
      req = req.clone({
        setHeaders: {
          Authorization: `${jwt.tokenType}${jwt.token}`
        }
      });
    }
    return next.handle(req);
  }
}
