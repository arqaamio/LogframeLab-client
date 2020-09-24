import { Component, OnInit } from '@angular/core';
import {UploadFile} from 'ng-zorro-antd/upload';
import {ManageIndicatorsService} from '../services/indicators-management/manage-indicators.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { IndicatorService } from '../services/indicator.service';

export const XLSX_FORMAT = "xlsx";
@Component({
  selector: 'app-indicators-upload',
  templateUrl: './indicators-upload.component.html',
  styleUrls: ['./indicators-upload.component.scss']
})
export class IndicatorsUploadComponent implements OnInit {
  fileList: UploadFile[] = [];
  uploading = false;

  constructor(private indicatorsService: ManageIndicatorsService, private msg: NzMessageService,
    private indicatorService: IndicatorService) { }

  ngOnInit(): void {
  }

  handleUploaded(): void {
    this.uploading = true;
    this.indicatorsService.uploadIndicatorsFileForApproval(this.fileList[0]).subscribe( response => {
      if (response.ok) {
        this.uploading = false;
        this.fileList = [];
        this.msg.success('Upload successful');
      } else {
        this.uploading = false;
        this.msg.error('Upload failed');
      }
    });
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = [];
    this.fileList.push(file);
    return false;
  }

  /**
   * Downloads the XLSX template to upload indicators
   */
  downloadTemplate(): void {
    this.indicatorService.downloadTemplate(XLSX_FORMAT).subscribe(response => {
      let blob = new Blob([response.body], { type: "application/octet-stream" });
      var link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = response.headers.get("filename");
      link.click();
      link.remove();
    });
  }
}
