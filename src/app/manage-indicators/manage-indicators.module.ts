import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageIndicatorsComponent } from './manage-indicators.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import {
  NzButtonModule, NzCheckboxModule,
  NzFormModule,
  NzGridModule, NzInputModule,
  NzModalModule,
  NzSelectModule, NzSwitchModule
} from "ng-zorro-antd";
import {CrudIndicatorComponent} from "./crud-indicator/crud-indicator.component";
import {FormsModule} from "@angular/forms";


const routes: Routes = [
  { path: '', component: ManageIndicatorsComponent }
];

@NgModule({
  declarations: [ManageIndicatorsComponent, CrudIndicatorComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NzTableModule,
    NzGridModule,
    NzButtonModule,
    NzModalModule,
    NzFormModule,
    NzSelectModule,
    NzCheckboxModule,
    NzInputModule,
    NzSwitchModule
  ]
})
export class ManageIndicatorsModule { }
