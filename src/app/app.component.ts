import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'LogframeLab';
  private SEC_ADMIN = 'SEC_ADMIN';
  private APP_USER = 'APP_USER';
  private INDICATOR_ADMIN = 'INDICATOR_ADMIN';

  isAuthenticated = false;
  authGroups: string[];

  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  ngOnInit() {
    
    this.authenticationService.jwt$.subscribe(value => {
      if (value) {
        this.isAuthenticated = true;
        this.authGroups = value.groups;
      } else {
        this.isAuthenticated = false;
        this.authGroups = [];
      }
    });
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

  logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['']).finally();
  }
}
