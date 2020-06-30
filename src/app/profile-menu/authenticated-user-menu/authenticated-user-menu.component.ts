import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-authenticated-user-menu',
  templateUrl: './authenticated-user-menu.component.html',
  styleUrls: ['./authenticated-user-menu.component.scss']
})
export class AuthenticatedUserMenuComponent implements OnInit {

  @Input()
  authGroups: string[];

  private SEC_ADMIN = 'SEC_ADMIN';
  private APP_USER = 'APP_USER';
  private INDICATOR_ADMIN = 'INDICATOR_ADMIN';

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  isSecAdmin(): boolean {
    return this.authGroups.includes(this.SEC_ADMIN);
  }

  isAppUser(): boolean {
    return this.authGroups.includes(this.APP_USER);
  }

  isIndicatorAdmin(): boolean {
    return this.authGroups.includes(this.INDICATOR_ADMIN);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['']).finally();
  }
}
