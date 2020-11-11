import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IndicatorComponent } from './indicator.component';
import { VisualizationModule } from './visualization/visualization.module';
import { SelectDocumentModule } from './selectdocument/selectdocument.module';
import { ScanResultModule } from './scanresult/scanresult.module';
import { ResultModule } from './result/result.module';
import { DownloadResultModule } from './downloadresult/downloadresult.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

const routes: Routes = [
  { path: '', component: IndicatorComponent }
];

@NgModule({
  declarations: [IndicatorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    NzButtonModule,
    NzIconModule,
    NzPopoverModule,
    NzStepsModule,
    NzSpinModule,
    SelectDocumentModule,
    ResultModule,
    ScanResultModule,
    VisualizationModule,
    DownloadResultModule
  ]
})
export class IndicatorModule { }