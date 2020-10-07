import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { IndicatorsUploadComponent } from './indicators-upload.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPopoverModule } from 'ng-zorro-antd/popover';

const routes: Routes = [
  { path: 'indicators-upload', component: IndicatorsUploadComponent }
];

@NgModule({
  declarations: [IndicatorsUploadComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzDividerModule,
    NzUploadModule,
    NzButtonModule,
    NzGridModule,
    NzPopoverModule,
    NzIconModule
  ]
})
export class IndicatorsUploadModule { }
