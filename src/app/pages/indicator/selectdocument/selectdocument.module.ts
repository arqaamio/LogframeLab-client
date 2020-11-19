import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectDocumentComponent } from './selectdocument.component';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';

@NgModule({
  declarations: [SelectDocumentComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzGridModule,
    NzFormModule,
    NzIconModule,
    NzUploadModule,
    NzSelectModule,
    NzDropDownModule,
    NzButtonModule,
    NzModalModule,
    NzProgressModule
  ],
  exports: [SelectDocumentComponent]
})
export class SelectDocumentModule { }