import {Injectable} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {


  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  private readonly LOGIN_URL = '/login';

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const jwt = this.authenticationService.jwt$.value;
    if (state.url === this.LOGIN_URL && jwt) {
      return false;
    }

    if (state.url !== this.LOGIN_URL && !jwt) {
      return false;
    }

    if (state.url === this.LOGIN_URL && !jwt) {
      return true;
    }

    if (state.url !== this.LOGIN_URL && jwt) {
      return true;
    }

    this.router.navigate([this.LOGIN_URL], {queryParams: {returnUrl: state.url}}).then(() => false);

    return false;
  }

}
