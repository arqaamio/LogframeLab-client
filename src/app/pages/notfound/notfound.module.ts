import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './notfound.component';

const routes: Routes = [
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotFoundModule { }