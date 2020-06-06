import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManageIndicatorsComponent } from './manage-indicators.component';
import { NzTableModule } from 'ng-zorro-antd/table';


const routes: Routes = [
  { path: '', component: ManageIndicatorsComponent }
];

@NgModule({
  declarations: [ManageIndicatorsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzTableModule
  ]
})
export class ManageIndicatorsModule { }
