import { Component, OnInit } from '@angular/core';
import { NzMessageService, UploadChangeParam } from 'ng-zorro-antd';
import { FileService } from 'src/app/services/file.service';
import { element } from 'protractor';
import { BoundElementProperty } from '@angular/compiler';

interface ItemData {
  id: number;
  level: string;
  color: string;
  label: string;
  description: string;
  keys: Array<string>;
  var: string;
}

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit {
  title = 'Indicator';

  urlfileUpload = '/indicator/upload';

  downloadDisabled = true;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  //
  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];

  loading = false;

  sortName: string | null = null;
  sortValue: string | null = null;

  searchValue = '';
  // themes filter
  listOfOption = [];
  listOfSelectedValue: string[] = [];

  //options for Tooltip can be found here: https://www.npmjs.com/package/ng2-tooltip-directive
  myOptions = {
    placement: 'top',
    trigger: 'hover',
    theme: 'light',
    'hide-delay': 0,
  };

  constructor(
    private msg: NzMessageService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.urlfileUpload = this.fileService.getBaseUrl() + '/indicator/upload';
  }

  isNotSelected(value: string): boolean {
    // refresh display data
    this.search();
    //
    return this.listOfSelectedValue.indexOf(value) === -1;
  }
  onChangethemeFiler() {}
  checkAll(value: boolean): void {
    this.displayData.forEach((item) => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }
  search(): void {
    /** filter data **/
    // filter by theme
    let data: ItemData[] = this.listOfData;
    if (this.listOfSelectedValue && this.listOfSelectedValue.length > 0) {
      data = this.listOfData.filter(
        (item: ItemData) =>
          this.listOfSelectedValue.indexOf(item.description) > -1
      );
    }
    // filter by indicator
    const filterFunc = (item: ItemData) => {
      return item.label.indexOf(this.searchValue) !== -1;
    };
    data = data.filter((item: ItemData) => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    } else {
      this.displayData = data;
    }
    this.refreshStatus();
  }
  refreshStatus() {
    this.downloadDisabled = true;
    this.isAllDisplayDataChecked = true;
    for (let item of this.displayData) {
      if (this.mapOfCheckedId[item.id]) {
        this.downloadDisabled = false;
      }
      if (!this.mapOfCheckedId[item.id]) {
        this.isAllDisplayDataChecked = false;
      }
    }
  }
  // file upload
  handleChange({ file, fileList, event }: UploadChangeParam): void {
    const status = file.status;
    // if (status !== 'uploading') {
    //}
    if (status == 'uploading' && event != null) {
      console.log('progress ' + event.percent);
      this.loading = true;
    }
    if (status === 'done') {
      this.msg.success(`${file.name} file uploaded successfully.`);
      this.listOfData = file.response;
      this.displayData = this.listOfData;
      this.listOfOption = [];
      this.listOfData.forEach((element) => {
        if (
          element.description &&
          this.listOfOption.indexOf(element.description) === -1
        )
          this.listOfOption.push(element.description);
      });
      this.loading = false;
    } else if (status === 'error') {
      this.msg.error(`${file.name} file upload failed.`);
      this.loading = false;
    }
  }
  downloadFile() {
    const exportData = this.displayData.filter(
      (item) => this.mapOfCheckedId[item.id]
    );
    this.fileService
      .downloadInidicators(exportData)
      .subscribe((response) =>
        this.downLoadFile(response, 'application/octet-stream')
      );
  }
  downLoadFile(response: any, type: string) {
    let blob = new Blob([response.body], { type: type });
    var link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = response.headers.get('filename');
    link.click();
  }
}
