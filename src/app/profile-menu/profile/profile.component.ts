import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  isAuthenticated = false;
  authGroups: string[];

  constructor(private authenticationService: AuthenticationService) {

  }

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
}
