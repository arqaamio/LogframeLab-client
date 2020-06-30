import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import {
  NzButtonModule,
  NzFormModule,
  NzGridModule,
  NzInputModule, NzSelectModule,
  NzTableModule
} from 'ng-zorro-antd';
import { AddUserRowComponent } from './add-user-row/add-user-row.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


const routes: Routes = [
  { path: '', component: UserManagementComponent }
];

@NgModule({
  declarations: [UserManagementComponent, AddUserRowComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzGridModule,
    NzTableModule,
    NzButtonModule,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    NzSelectModule,
    FormsModule
  ]
})
export class UserManagementModule { }
