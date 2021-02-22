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
import { ActivitiesComponent } from './activities/activities.component';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDividerModule} from 'ng-zorro-antd/divider';
import { AddActivitiesComponent } from './activities/add-activities/add-activities.component';
import { AddMeansComponent } from './activities/add-means/add-means.component';
import { AddCostsComponent } from './activities/add-costs/add-costs.component';
import { AddAssumptionsComponent } from './activities/add-assumptions/add-assumptions.component';
import {FormsModule} from '@angular/forms';
import {NzListModule} from 'ng-zorro-antd/list';

const routes: Routes = [
  { path: '', component: IndicatorComponent }
];

@NgModule({
  declarations: [IndicatorComponent, ActivitiesComponent, AddActivitiesComponent, AddMeansComponent, AddCostsComponent, AddAssumptionsComponent],
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
    DownloadResultModule,
    NzInputModule,
    NzSelectModule,
    NzFormModule,
    NzDividerModule,
    FormsModule,
    NzListModule
  ]
})
export class IndicatorModule { }
