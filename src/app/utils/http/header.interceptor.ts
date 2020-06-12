import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: "root"})
export class DefaultHeaderInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   /* if (!req.headers.has("Content-Type")) {
      req = req.clone({
        setHeaders: {
          "Content-Type": "application/json"
        }
      })
    } */
    return next.handle(req);
  }

}
