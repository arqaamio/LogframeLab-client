import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndicatorService } from "src/app/services/indicator.service";
import { UploadFile } from "ng-zorro-antd";
import { NzMessageService } from "ng-zorro-antd/message";

import { HttpEventType, HttpEvent } from "@angular/common/http";
import { Subscription } from "rxjs";

@Component({
  selector: "app-scandocument",
  templateUrl: "./scandocument.component.html",
  styleUrls: ["./scandocument.component.scss"],
})
export class ScanDocumentComponent implements OnInit, OnDestroy {
  indicatorSubscribtion: Subscription = null;

  isUploaded = false;
  isScanned = false;

  files: UploadFile[] = null;
  progress: number = 0;

  constructor(
    private indicatorService: IndicatorService,
    private msg: NzMessageService
  ) {}

  ngOnInit() {
    this.indicatorService.setSelectedData(null);
    this.indicatorService.setloadedData(null);

    this.indicatorSubscribtion = this.indicatorService
      .handleUpload()
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!");
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            if (this.progress === 100) {
              setTimeout(() => {
                this.isUploaded = true;
              }, 2000);
            }
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.isScanned = true;
            console.log("document has been successfully scanned ", event.body);
            setTimeout(() => {
              this.indicatorService.setloadedData(event.body);
            }, 2000);
        }
      });
  }
  ngOnDestroy() {
    this.indicatorSubscribtion.unsubscribe();
  }
}
