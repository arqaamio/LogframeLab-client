import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from 'rxjs/operators';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable()
export class ResponseJwtInterceptor implements HttpInterceptor {

  private JWS_KEY = 'jws';

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      map(resp => {
        if (resp instanceof HttpResponse) {
          const responseJws = resp.headers.get(this.JWS_KEY);
          if (responseJws) {
            this.authenticationService.renewJwt(responseJws);
          }
          return resp;
        }
      })
    );
  }
}
