import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { take, tap } from 'rxjs/operators';
import { FilterDto } from 'src/app/services/dto/filter.dto';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs/internal/Subscription';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { RxStompService } from '@stomp/ng2-stompjs';
import { interval } from 'rxjs/internal/observable/interval';
import { NzModalService } from 'ng-zorro-antd/modal';

export const WEBSOCKET_BROKER_URL: string = '/topic/progress';
export const UPLOAD_TITLE: string = 'Uploading';
export const SCANNING_TITLE: string = 'Scanning';
export const DONE_TITLE: string = 'Done';

@Component({
  selector: 'app-selectdocument',
  templateUrl: './selectdocument.component.html',
  styleUrls: ['./selectdocument.component.scss'],
})
export class SelectDocumentComponent implements OnInit, OnDestroy {
  uploadStateTitle = '';
  indicatorSubscription: Subscription = null;
  stompSubscription: Subscription = null;
  uploadSubscription: Subscription = null;
  nextButtonSubscription: Subscription = null;
  fileList: NzUploadFile[] = [];
  fileName: string;
  selectedValues = new FilterDto();
  filterOptions = new FilterDto();
  progress = 0;
  @Output() loadingStart = new EventEmitter<any>();
  fileScanned = true;

  constructor(
    private indicatorService: IndicatorService,
    private rxStompService: RxStompService,
    private modalService: NzModalService
  ) {
    this.rxStompService.deactivate();
  }

  ngOnInit() {
    // because of Angular Lifecycle Hooks
    setTimeout(() => {
      this.indicatorService.loadingStart.next(true);
      this.indicatorService.updateNextButton(true);
    });
    if(this.filterOptions.level.length === 0){
      this.indicatorService.getFilters(false).subscribe((filters) => {
        this.filterOptions = filters;
        this.indicatorService.loadingStart.next(false);
      }, error=> {
        // because of the first timeout with the loading
        setTimeout(() => {
          this.indicatorService.loadingStart.next(false);
        });    
        this.modalService.error({
          nzTitle: 'An error has occurred',
          nzContent: 'It seems we are having technical issues. Try reloading the page, otherwise please try again later.'
        });
        console.error(error);
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

    this.nextButtonSubscription = this.indicatorService
      .getNextButtonSubject()
      .subscribe((data) => {
        // Next button pressed
        if (data?.pressed && !data?.force) {
          this.fileList = this.fileList.filter(x=>x.status!='removed');
          this.indicatorService.setFileUploadList(this.fileList);
          if(this.fileList.length> 0){
            this.uploadAndScan(this.fileList[0]);
          } else {
            this.indicatorService.pressNextButton(true);        
          }
        }
      });
  }

  removeFile(): void {
    this.fileList = [];
    this.indicatorService.setFileUploadList(this.fileList);
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = [file];
    return false;
  };

  /**
   * Function called when a file is selected by nz-upload
   * @param item NZ-Zorro item with the selected file
   */
  uploadAndScan = (item: NzUploadFile) => {
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

    this.uploadSubscription = this.indicatorService
    .uploadFile(item)
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
            const subscription = interval(1000).subscribe(() => {
              this.progress++;
              // Stopping condition
              if(this.fileScanned) subscription.unsubscribe();
            });
            setTimeout(null,1000);
          }
          break;
        case HttpEventType.Response:
          this.fileScanned = true;
          this.progress = 100;
          this.uploadStateTitle = DONE_TITLE;
          this.indicatorService.setIsNewInfo(true);
          this.indicatorService.setLoadedData(event.body);
          this.indicatorService.setFileUploadList([item]);

          setTimeout(()=> {
            this.indicatorService.pressNextButton(true);
            this.indicatorService.loadingStart.next(true);  
          }, 1000);
        
      }
    }, (error) => {
      this.modalService.error({
        nzTitle: 'An error has occurred',
        nzContent: 'It seems we are having technical issues. Try reloading the page, otherwise please try again later.'
      });
      this.fileScanned = true;
      this.indicatorService.updateNextButton(true);
      this.progress = 0;
      this.rxStompService.deactivate();
      throw error;
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
  isOptionSelected(filter: string, value: any): boolean {
    if(filter === 'sector') {
      return this.selectedValues[filter].indexOf(value) !== -1;
    } else {
      return this.selectedValues[filter].some(x=>x.id == value.id);
    }
    
  }

  /**
   * Compares items so see if they are the equal
   * @param item1 Item
   * @param item2 Item 2
   * @returns Whether both items are equal or not
   */
  compare = (item1: any, item2: any): boolean =>
    item1 && item2 ? item1.id === item2.id : item1 === item2;

  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
    if(this.stompSubscription != null) {
      this.stompSubscription.unsubscribe();
      this.rxStompService.deactivate();
    }
    this.uploadSubscription?.unsubscribe();
    this.nextButtonSubscription?.unsubscribe();
  }
}
