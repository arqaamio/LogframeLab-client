import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzLayoutModule
  ],
  exports: [DialogComponent]
})
export class DialogModule { }