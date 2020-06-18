import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import {NzIconModule, NzMenuModule} from "ng-zorro-antd";
import {RouterModule} from "@angular/router";
import { AuthenticatedUserMenuComponent } from './authenticated-user-menu/authenticated-user-menu.component';
import { AnonymousUserMenuComponent } from './anonymous-user-menu/anonymous-user-menu.component';



@NgModule({
  declarations: [ProfileComponent, AuthenticatedUserMenuComponent, AnonymousUserMenuComponent],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzIconModule
  ]
})
export class ProfileMenuModule { }
