import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ManageIndicatorsComponent} from './manage-indicators.component';

import {CrudIndicatorComponent} from './crud-indicator/crud-indicator.component';
import {FormsModule} from '@angular/forms';
import {ApproveUploadedIndicatorsComponent} from './approve-uploaded-indicators/approve-uploaded-indicators.component';
import {NzGridModule} from 'ng-zorro-antd/grid';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSwitchModule} from 'ng-zorro-antd/switch';
import {NzIconModule} from 'ng-zorro-antd/icon';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { AuthGuard } from '../utils/auth.guard';


const routes: Routes = [
  {path: 'manage-indicators', component: ManageIndicatorsComponent, canActivate: [AuthGuard]},
  {path: 'manage-indicators/approve-uploaded', component: ApproveUploadedIndicatorsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [ManageIndicatorsComponent, CrudIndicatorComponent, ApproveUploadedIndicatorsComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NzGridModule,
    NzButtonModule,
    NzTableModule,
    NzCheckboxModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSwitchModule,
    NzSelectModule,
    NzSliderModule,
    NzIconModule
  ]
})
export class ManageIndicatorsModule {
}
