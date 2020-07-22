import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { UserManagementComponent } from './user-management.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
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
