import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import {RouterModule} from '@angular/router';
import { AuthenticatedUserMenuComponent } from './authenticated-user-menu/authenticated-user-menu.component';
import { AnonymousUserMenuComponent } from './anonymous-user-menu/anonymous-user-menu.component';
import {IndicatorsUploadModule} from '../indicators-upload/indicators-upload.module';



@NgModule({
  declarations: [ProfileComponent, AuthenticatedUserMenuComponent, AnonymousUserMenuComponent],
  exports: [
    ProfileComponent
  ],
  imports: [
    CommonModule,
    NzMenuModule,
    RouterModule,
    NzIconModule,
    IndicatorsUploadModule
  ]
})
export class ProfileMenuModule { }
