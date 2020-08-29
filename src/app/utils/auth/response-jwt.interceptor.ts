import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../services/authentication.service';

@Injectable({providedIn: 'root'})
export class ResponseJwtInterceptor implements HttpInterceptor {

  private JWS_KEY = 'jws';

  constructor(private authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const responseJws = req.headers.get(this.JWS_KEY);
    if (responseJws) {
       this.authenticationService.renewJwt(responseJws);
    }
    return next.handle(req);
  }
}
