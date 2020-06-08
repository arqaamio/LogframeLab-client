import { Component, OnInit, OnDestroy } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs';

interface ItemData {
  id: number;
  level: string;
  color: string;
  name: string;
  description: string;
  themes: string;
  source: string;
  disaggregation: boolean;
  crsCode: string;
  sdgCode: string;
  numTimes: number;
  keys: Array<string>;
  var: string;
}

@Component({
  selector: 'app-scanresult',
  templateUrl: './scanresult.component.html',
  styleUrls: ['./scanresult.component.scss'],
})
export class ScanresultComponent implements OnInit, OnDestroy {
  indicatorSubscribtion: Subscription = null;

  downloadDisabled = true;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];
  sortName: string | null = null;
  sortValue: string | null = null;
  searchValue = '';

  impactCount = 0;
  outcomeCount = 0;
  outputCount = 0;

  initData = true;

  myOptions = {
    placement: 'top',
    trigger: 'hover',
    theme: 'light',
    'hide-delay': 0,
  };

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit() {
    this.indicatorSubscribtion = this.indicatorService
      .getIndicatorSubject()
      .subscribe((data) => {
        if (this.initData && data != null && data.dataResponse != null) {
          this.listOfData = data.dataResponse;
          this.displayData = data.dataResponse;
          console.log('total:  ' + this.displayData.length);
          this.initData = false;
        }
        if (data != null && data.selectedData != null)
          this.mapOfCheckedId = data.selectedData;
      });
  }
  ngOnDestroy() {
    this.indicatorSubscribtion.unsubscribe();
  }
  checkAll(value: boolean): void {
    this.displayData.forEach((item) => (this.mapOfCheckedId[item.id] = value));
    this.refreshStatus();
  }
  sort(sort: { key: string; value: string }): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search();
  }
  search(): void {
    /** filter data **/
    // filter by theme
    let data: ItemData[] = this.listOfData;
    // filter by indicator
    const filterFunc = (item: ItemData) => {
      if (item.name.indexOf(this.searchValue) !== -1) {
        return true;
      }
      this.mapOfCheckedId[item.id] = false;
      return false;
    };
    this.displayData = data.filter((item: ItemData) => filterFunc(item));
    /** sort data **/
    if (this.sortName && this.sortValue) {
      this.displayData = this.displayData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName!] > b[this.sortName!]
            ? 1
            : -1
          : b[this.sortName!] > a[this.sortName!]
          ? 1
          : -1
      );
    }
    this.refreshStatus();
  }
  selectindicator(id) {
    this.mapOfCheckedId[id] = !this.mapOfCheckedId[id];
    this.refreshStatus();
  }
  refreshStatus() {
    this.outputCount = 0;
    this.impactCount = 0;
    this.outcomeCount = 0;
    if (this.displayData.length > 0) {
      this.downloadDisabled = true;
      this.isAllDisplayDataChecked = true;
      for (let item of this.displayData) {
        if (this.mapOfCheckedId[item.id]) {
          this.downloadDisabled = false;
          if (item.level === 'OUTPUT') {
            this.outputCount++;
          } else if (item.level === 'IMPACT') {
            this.impactCount++;
          } else if (item.level === 'OUTCOME') {
            this.outcomeCount++;
          }
        }
        if (!this.mapOfCheckedId[item.id]) {
          this.isAllDisplayDataChecked = false;
        }
      }
    }
    if (this.downloadDisabled) this.indicatorService.setSelectedData(null);
    else this.indicatorService.setSelectedData(this.mapOfCheckedId);
  }

  formatCrsCode(code: string): string {
    if (code) {
      return code.split('.')[0];
    }
    return '';
  }

  onAfterChange(value: number): void {
    let data: ItemData[] = this.listOfData;
    this.displayData = data.filter((item: ItemData) => item.numTimes === value);
  }
}
