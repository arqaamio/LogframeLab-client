import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take, tap } from 'rxjs/operators';
import { FilterDto, Level } from 'src/app/services/dto/filter.dto';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs/internal/observable/interval';
import { UploadFile } from 'ng-zorro-antd/upload';

export const UPLOAD_TITLE: string = 'Uploading';
export const SCANNING_TITLE: string = 'Scanning';
export const DONE_TITLE: string = 'Done';

@Component({
  selector: 'app-selectdocument',
  templateUrl: './selectdocument.component.html',
  styleUrls: ['./selectdocument.component.scss'],
})
export class SelectdocumentComponent implements OnInit, OnDestroy {
  uploadStateTitle = '';
  indicatorSubscription: Subscription = null;
  fileList: UploadFile[] = [];
  fileName: string;
  selectedValues = new FilterDto();
  filterOptions = new FilterDto();
  progress = 0;
  fileScanned = true;

  constructor(
    private indicatorService: IndicatorService,
    private msg: NzMessageService
  ) {
    // can't be in ngOnInit because of Angular Lifecycle Hooks
    this.indicatorService.updateNextButton(true);
  }

  beforeUpload = (file: UploadFile): boolean => {
    this.fileList.pop();
    this.fileList = this.fileList.concat(file);
    this.fileName = file.name;
    this.indicatorService.setFileUploadList(this.fileList);
    return false;
  }

  ngOnInit() {
    if(this.filterOptions.level.length === 0){
      this.indicatorService.getFilters().subscribe((filters) => {
        this.filterOptions = filters;
      });
    }
    this.indicatorSubscription = this.indicatorService
      .getIndicatorSubject()
      .pipe(
        take(1),
        tap((data) => {
          if(data==null) this.indicatorService.setIsNewInfo(true);
          if(data!=null && data.files != null && data.files.length > 0) {
            this.fileList = data.files;
            this.fileName = this.fileList[0].name;
          }
          if (data != null && data.filters != null) {
            this.selectedValues = data.filters;
          }
        })
      )
      .subscribe();
  }

  /**
   * Function called when a file is selected by nz-upload
   * @param item NZ-Zorro item with the selected file
   */
  uploadAndScan = (item: any) => {
    this.indicatorService.updateNextButton(false);
    this.indicatorService.setSelectedData(null);
    this.indicatorService.setLoadedData(null);
    this.uploadStateTitle = UPLOAD_TITLE;
    this.fileScanned = false;
    this.progress = 1;
    return this.indicatorService
      .uploadFile(item.file)
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
            if(this.progress == 100){
              this.uploadStateTitle = SCANNING_TITLE;
              this.progress = 1;
              // fake real time progress
              const subscription = interval(1000).subscribe(()=>{
                this.progress++;
                // Stopping condition
                if(this.fileScanned) subscription.unsubscribe();
              });
            }
            break;
          case HttpEventType.Response:
            this.fileScanned = true;
            console.log("document has been successfully scanned ", event.body);
            this.progress = 100;
            this.uploadStateTitle = DONE_TITLE;
            this.indicatorService.setIsNewInfo(true);
            this.indicatorService.setLoadedData(event.body);
            this.indicatorService.setFileUploadList([item.file]);
            setTimeout(()=>this.indicatorService.pressNextButton(), 1000);
        }
      });
  }

  /**
   * Triggered whenever the dropdowns of the filters are changed, updates the models
   * @param filter Filter that was changed
   * @param event Value of the filter to which it was changed
   */
  onChangeFilter(filter: string, event: any) {
    this.selectedValues[filter] = event;
    this.indicatorService.setFilters(this.selectedValues);
    this.indicatorService.setIsNewInfo(true);
  }

  /**
   * Checks if the filters value are not selected
   * @param filter Filter to check
   * @param value Value of the filter to check
   */
  isNotSelected(filter: string, value: any): boolean {
    return this.selectedValues[filter].indexOf(value) === -1;
  }

  /**
   * Compares levels so see if they are the same
   * @param level1 Level
   * @param level2 Level
   */
  compare = (level1: Level, level2: Level): boolean =>
    level1 && level2 ? level1.id === level2.id : level1 === level2;

  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
  }
}
