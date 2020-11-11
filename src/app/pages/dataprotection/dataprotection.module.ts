import { NgModule } from '@angular/core';
import { DataProtectionComponent } from './dataprotection.component';
import { RouterModule, Routes } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

const routes: Routes = [
  { path: 'dataprotection', component: DataProtectionComponent }
];

@NgModule({
  declarations: [DataProtectionComponent],
  imports: [
    RouterModule.forChild(routes),
    NzGridModule,
    NzLayoutModule
  ]
})
export class DataProtectionModule { }