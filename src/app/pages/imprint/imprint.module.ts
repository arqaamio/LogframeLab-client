import { NgModule } from '@angular/core';
import { ImprintComponent } from './imprint.component';
import { RouterModule, Routes } from '@angular/router';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

const routes: Routes = [
  { path: 'imprint', component: ImprintComponent }
];

@NgModule({
  declarations: [ImprintComponent],
  imports: [
    RouterModule.forChild(routes),
    NzGridModule,
    NzLayoutModule
  ]
})
export class ImprintModule { }