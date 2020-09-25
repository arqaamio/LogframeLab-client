import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take, tap } from 'rxjs/operators';
import { FilterDto, Level } from 'src/app/services/dto/filter.dto';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { interval } from 'rxjs/internal/observable/interval';
import { UploadFile } from 'ng-zorro-antd/upload';
import { RxStompService } from '@stomp/ng2-stompjs';

export const WEBSOCKET_BROKER_URL: string = '/topic/progress';
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
  stompSubscription: Subscription = null;
  fileList: UploadFile[] = [];
  fileName: string;
  selectedValues = new FilterDto();
  filterOptions = new FilterDto();
  progress = 0;
  @Output() loadingStart = new EventEmitter<any>();
  fileScanned = true;

  constructor(
    private indicatorService: IndicatorService,
    private msg: NzMessageService,
    private rxStompService: RxStompService
  ) {
    // can't be in ngOnInit because of Angular Lifecycle Hooks
    this.indicatorService.updateNextButton(true);
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
    this.rxStompService.activate();
    this.indicatorService.updateNextButton(false);
    this.indicatorService.setSelectedData(null);
    this.indicatorService.setLoadedData(null);
    this.uploadStateTitle = UPLOAD_TITLE;
    this.fileScanned = false;
    this.progress = 1;

    //TODO: remove timeout in its new major release https://github.com/stomp-js/ng2-stompjs/issues/198
    setTimeout(()=> {
      this.stompSubscription = this.rxStompService.watch(WEBSOCKET_BROKER_URL).subscribe((message) => {
        this.progress = JSON.parse(message.body).value;
      });
    }, 1000);

    return this.indicatorService
      .uploadFile(item.file)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            break;
          case HttpEventType.ResponseHeader:
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            if(this.progress == 100){
              this.uploadStateTitle = SCANNING_TITLE;
              this.progress = 1;
              // fake real time progress
              // const subscription = interval(1000).subscribe(()=>{
              //   this.progress++;
              //   // Stopping condition
              //   if(this.fileScanned) subscription.unsubscribe();
              // });
              setTimeout(null,1000);
            }
            break;
          case HttpEventType.Response:
            this.fileScanned = true;
            this.progress = 100;
            this.uploadStateTitle = DONE_TITLE;
            this.indicatorService.setIsNewInfo(true);
            this.indicatorService.setLoadedData(event.body);
            this.indicatorService.setFileUploadList([item.file]);
           
            setTimeout(()=> {
              this.indicatorService.pressNextButton();
              this.indicatorService.loadingStart.next(true);
            }, 1000);
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
    this.indicatorService.setLoadedData(null);
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
   * Compares levels, sources, sdgs and dacs to see if they are the same
   * @param object Object
   * @param object2 Object 2
   */
  compare = (object: any, object2: any): boolean =>
  object && object2 ? object.id === object2.id : object === object2;

  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
    if(this.stompSubscription != null){
      this.stompSubscription.unsubscribe();
      this.rxStompService.deactivate();
    }
  }
}
