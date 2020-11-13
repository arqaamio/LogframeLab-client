import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TermsOfUseComponent } from './termsofuse.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzGridModule } from 'ng-zorro-antd/grid';

const routes: Routes = [
  { path: 'terms', component: TermsOfUseComponent }
];

@NgModule({
  declarations: [TermsOfUseComponent],
  imports: [
    RouterModule.forChild(routes),
    NzGridModule,
    NzLayoutModule
  ]
})
export class TermsOfUseModule { }