import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VisualizationComponent } from './visualization.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [VisualizationComponent],
  imports: [
    CommonModule,
    NzIconModule
  ],
  exports: [VisualizationComponent]
})
export class VisualizationModule { }