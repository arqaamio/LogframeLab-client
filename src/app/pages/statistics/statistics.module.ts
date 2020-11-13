import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatisticsComponent } from './statistics.component';
import { RouterModule, Routes } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { AuthGuard } from 'src/app/utils/auth.guard';


const routes: Routes = [
  { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzTableModule
  ]
})
export class StatisticsModule { }
