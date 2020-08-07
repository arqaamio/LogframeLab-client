import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndicatorService } from "src/app/services/indicator.service";
import { UploadFile } from "ng-zorro-antd";
import { NzMessageService } from "ng-zorro-antd/message";

import { HttpEventType, HttpEvent } from "@angular/common/http";
import { Subscription } from "rxjs";
import { RxStompService } from '@stomp/ng2-stompjs';


export const WEBSOCKET_BROKER_URL: string = '/topic/progress';
export const UPLOADING_TITLE: string = 'Uploading';
export const SCANNING_TITLE: string = 'Scanning';
export const DONE_TITLE: string = 'Done';

@Component({
  selector: "app-scandocument",
  templateUrl: "./scandocument.component.html"
})
export class ScanDocumentComponent implements OnInit, OnDestroy {
  indicatorSubscription: Subscription = null;
  stompSubscription: Subscription = null;
  files: UploadFile[] = null;
  progress: number = 0;
  stepTitle = UPLOADING_TITLE;

  constructor(
    private indicatorService: IndicatorService,
    private msg: NzMessageService,
    private rxStompService: RxStompService
  ) {}

  ngOnInit() {
    this.rxStompService.activate();

    this.indicatorService.setSelectedData(null);
    this.indicatorService.setLoadedData(null);

    //TODO: remove timeout in its new major release https://github.com/stomp-js/ng2-stompjs/issues/198
    setTimeout(()=> {
      this.stompSubscription = this.rxStompService.watch(WEBSOCKET_BROKER_URL).subscribe((message) => {
        this.progress = JSON.parse(message.body).value;
      });
    }, 1000);

    this.indicatorSubscription = this.indicatorService
      .handleUpload()
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log("Request has been made!");
            break;
          case HttpEventType.ResponseHeader:
            console.log("Response header has been received!", event);
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            if (this.progress === 100) {
              this.progress = 0;
              this.stepTitle = SCANNING_TITLE;
              setTimeout(null,1000);
            }
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            this.stepTitle = DONE_TITLE;
            this.progress = 100;
            console.log("document has been successfully scanned ", event.body);
            this.indicatorService.setLoadedData(event.body);
        }
      });
  }

  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
    this.stompSubscription.unsubscribe();
    this.rxStompService.deactivate();
  }
}
