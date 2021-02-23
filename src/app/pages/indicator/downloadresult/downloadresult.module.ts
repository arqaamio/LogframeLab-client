import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DownloadResultComponent } from './downloadresult.component';

@NgModule({
  declarations: [DownloadResultComponent],
  imports: [
    CommonModule,
  ],
  exports: [DownloadResultComponent]
})
export class DownloadResultModule { }