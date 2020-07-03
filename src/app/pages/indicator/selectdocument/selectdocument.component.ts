import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndicatorService } from "src/app/services/indicator.service";
import { NzMessageService, UploadFile } from "ng-zorro-antd";
import { take, tap } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: "app-selectdocument",
  templateUrl: "./selectdocument.component.html",
  styleUrls: ["./selectdocument.component.scss"],
})
export class SelectdocumentComponent implements OnInit, OnDestroy {
  indicatorSubscribtion: Subscription = null;

  fileList: UploadFile[] = [];
  fileName: string;

  constructor(
    private indicatorService: IndicatorService,
    private msg: NzMessageService
  ) {}

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.pop();
    this.fileList = this.fileList.concat(file);
    this.fileName = file.name;
    this.indicatorService.setFileUploadList(this.fileList);
    return false;
  };

  ngOnInit() {
    this.indicatorSubscribtion = this.indicatorService
      .getIndicatorSubject()
      .pipe(
        take(1),
        tap((data) => {
          if (data != null && data.files != null && data.files.length > 0) {
            this.fileList = data.files;
            this.fileName = this.fileList[0].name;
          }
        })
      )
      .subscribe();
  }
  ngOnDestroy() {
    this.indicatorSubscribtion.unsubscribe();
  }
}
