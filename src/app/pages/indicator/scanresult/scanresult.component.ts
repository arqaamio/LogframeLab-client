import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs/internal/Subscription';
import Utils from 'src/app/utils/utils';
import { IndicatorResponse } from 'src/app/models/indicatorresponse.model';
import { FilterData } from 'src/app/services/dto/filter-data.dto';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { NullVisitor } from '@angular/compiler/src/render3/r3_ast';

interface ItemData {
  indicator: IndicatorResponse;
  sort_id:number;
  countryCodeSelected:string;
  yearSelected:Date;
  baseLineValue:any;
}


export class SearchFilter {
  level: FilterData[];
  source: FilterData[];
  disaggregation: FilterData[];
  sector: FilterData[];
  crsCode: FilterData[];
  sdgCode: FilterData[];

  constructor(){
    this.level = [];
    this.source = [];
    this.disaggregation = [];
    this.sector = [];
    this.crsCode = [];
    this.sdgCode = [];
  }
}

export const MIN_KEYWORD_VALUE: number = 5;
export const DISAG_YES_FILTER_DATA: FilterData = {text: 'Yes', value:0};
export const DISAG_NO_FILTER_DATA: FilterData = {text: 'No', value:1};

@Component({
  selector: 'app-scanresult',
  templateUrl: './scanresult.component.html',
  styleUrls: ['./scanresult.component.scss'],
})
export class ScanResultComponent implements OnInit, OnDestroy {
  indicatorSubscription: Subscription = null;

  downloadDisabled = true;
  isAllDisplayDataChecked = false;
  isIndeterminate = false;
  mapOfCheckedId: { [key: string]: boolean } = {};
  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];
  selectedIndicators: ItemData[] = [];
  filteredSelectedIndicators: ItemData[] = [];
  searchFilter: SearchFilter = new SearchFilter();
  sortName: string | null = null;
  sortValue: string | null = null;
  searchValue = '';
  searchSelected = '';
  sliderMinValue = 0;
  sliderMaxValue = 0;
  impactCount = 0;
  outcomeCount = 0;
  outputCount = 0;
  showLoading = true;
  showKeywordCol = true;
  myOptions = {
    placement: 'top',
    trigger: 'hover',
    theme: 'light',
    'hide-delay': 0,
  };

  countriesList = [];

  expandSet = new Set<number>();
  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
  }
  today = new Date();

  constructor(private indicatorService: IndicatorService) {}

  ngOnInit(): void {
   
    this.indicatorSubscription = this.indicatorService
      .getIndicatorSubject()
      .pipe(
        take(1),
        tap((data) => {
        let isNewInfo = data==null ? true : data.isNewInfo;
        // show keyword column if document was uploaded
        this.showKeywordCol = data != null && data.dataResponse != null;
        if(data!=null){
          // with document
          if (isNewInfo && data.dataResponse != null) {
            this.listOfData = data.dataResponse.map((indicator,i)=>{return {indicator: indicator, sort_id: i + 1, countryCodeSelected: null, yearSelected: new Date(), baseLineValue: null}});
            this.indicatorService.setLoadedData(this.listOfData);
            this.displayData = this.listOfData;

            const result = Utils.findMinAndMaxValue(data.dataResponse, 'numTimes');
            this.sliderMinValue = result.minValue;
            this.sliderMaxValue = result.maxValue;
            this.showLoading = false;
          }

          // without document
          if (isNewInfo && data.dataResponse == null){
            this.indicatorService.getIndicators(data.filters).subscribe((response) => {

              if(response != null && response.length > 0) {
                this.listOfData = response.map((indicator,i)=>{return {indicator: indicator, sort_id: i + 1, countryCodeSelected: null, yearSelected: new Date(), baseLineValue: null}});

                this.indicatorService.setLoadedData(this.listOfData);
                this.displayData = this.listOfData;
                this.sliderMinValue = this.sliderMaxValue = 1;
                this.showLoading = false;
              }
            });
          }

          // without changes in the filters or documents
          if(!data.isNewInfo && data.dataResponse != null){
            this.listOfData = data.dataResponse;
            this.displayData = this.listOfData;
            if(data.selectedData != null) {
              this.selectedIndicators = this.filteredSelectedIndicators = data.selectedData;
              this.listOfData.forEach((x, i)=>{
                if(this.selectedIndicators.find(y=>y.indicator.id == x.indicator.id)){
                  this.mapOfCheckedId[x.sort_id] = true;
                }
              });
              this.refreshStatus();
            }

            this.showLoading = false;
          }
          let mapLevels: Map<string, FilterData> = new Map();
          let mapSource: Map<string, FilterData> = new Map();
          let mapSDGCode: Map<string, FilterData> = new Map();
          let mapCRSCode: Map<string, FilterData> = new Map();
          let mapSector: Map<string, FilterData> = new Map();
          let mapDisag: Map<string, FilterData> = new Map();


          this.listOfData.forEach((x)=>{
            mapLevels.set(x.indicator.level,new FilterData(x.indicator.level));
            x.indicator.source.forEach((z)=> mapSource.set(z.id.toString(),{text:z.name, value: z.id}));
            x.indicator.sdgCode.forEach((z)=> mapSDGCode.set(z.id.toString(),{text:z.name, value: z.id}));
            x.indicator.crsCode.forEach((z)=> mapCRSCode.set(z.id.toString(),{text:z.name, value: z.id}));
            mapDisag.set(x.indicator.disaggregation + '', x.indicator.disaggregation ? DISAG_YES_FILTER_DATA: DISAG_NO_FILTER_DATA);
            mapSector.set(x.indicator.sector,new FilterData(x.indicator.sector));
          })
          mapLevels.forEach((value, _)=> {this.searchFilter?.level.push(value);});
          mapSource.forEach((value, _)=> {this.searchFilter.source.push(value);});
          mapSDGCode.forEach((value, _)=> {this.searchFilter.sdgCode.push(value);});
          mapCRSCode.forEach((value, _)=> {this.searchFilter.crsCode.push(value);});
          mapSector.forEach((value, _)=> {this.searchFilter.sector.push(value);});
          mapDisag.forEach((value, _)=> {this.searchFilter.disaggregation.push(value);});
          //TODO: Fix this, this can't be here
          let enableNextButton = false;
          for (const key in this.mapOfCheckedId) {
            if (Object.prototype.hasOwnProperty.call(this.mapOfCheckedId, key)) {
              if(this.mapOfCheckedId[key]){
                enableNextButton = true;
                break;
              }
            }
          }
          setTimeout(() => {
            this.indicatorService.updateNextButton(enableNextButton);
            this.indicatorService.loadingStart.next(false);
          },1000);
        }
        this.indicatorService.setIsNewInfo(false);
      })).subscribe();

      this.indicatorService.getWoldBanlCountries().subscribe(data => {
        console.log('get worldbank countries');
        Object.keys(data).forEach(item => {
          this.countriesList.push({
            lable: data[item],
            code: item
          });
        });
      });
  }
  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
  }
  checkAll(value: boolean): void {
    this.displayData.forEach((item) => (this.mapOfCheckedId[item.sort_id] = value));
    this.refreshStatus();
  }
  sort(sort: { key: string; value: string }, isSelectedTable: boolean): void {
    this.sortName = sort.key;
    this.sortValue = sort.value;
    this.search(isSelectedTable);
  }
  search(isSelectedTable: boolean): void {
    let search: string = isSelectedTable ? this.searchSelected : this.searchValue;
    /** filter data **/
    // filter by indicator
    const filterFunc = (item: ItemData) => {
      // this.mapOfCheckedId[item.sort_id] = false;
      return item.indicator.name.toUpperCase().indexOf(search.toUpperCase()) !== -1;
    };
    if(isSelectedTable){
      this.filteredSelectedIndicators = this.selectedIndicators.filter((item: ItemData) => filterFunc(item));
    }else {
      this.displayData = this.listOfData.filter((item: ItemData) => filterFunc(item));
    }
    /** sort data **/
    // sort columns
    let isColumnSort = false;
    if (this.sortName && this.sortValue) {
      isColumnSort = true;
      this.displayData = this.displayData.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a.indicator[this.sortName!] > b.indicator[this.sortName!]
            ? 1
            : -1
          : b.indicator[this.sortName!] > a.indicator[this.sortName!]
          ? 1
          : -1
      );
    }
    // checked sort logic
     this.displayData = this.displayData.sort((a, b) =>
       this.mapOfCheckedId[b.sort_id] && !this.mapOfCheckedId[a.sort_id] ? 1 : -1
     );
    // checked backend sort logic
     this.displayData = this.displayData.sort((a, b) =>
       this.mapOfCheckedId[b.sort_id] && this.mapOfCheckedId[a.sort_id]
         ? b.sort_id > a.sort_id
           ? -1
           : 1
         : 0
     );
     if (!isColumnSort) {
       // unchecked backend sort logic
       this.displayData = this.displayData.sort((a, b) =>
         !this.mapOfCheckedId[b.sort_id] && !this.mapOfCheckedId[a.sort_id]
           ? b.sort_id > a.sort_id
             ? -1
             : 1
           : 0
       );
     }
    this.refreshStatus();
  }
  
  /**
   * Triggered when selected item in the table
   * Updates the list of selected indicators and clear search of selected indicator
   * @param id Sort Id of the selected indicator
   * @param item ItemData indicator
   */
  selectindicator(id, item: ItemData) {
    this.indicatorService.canvasJson = {"result":[], "indicator":[]};
    this.mapOfCheckedId[id] = !this.mapOfCheckedId[id];
    if(this.mapOfCheckedId[id]){
      this.selectedIndicators.push(item);
    } else {
      this.selectedIndicators = this.selectedIndicators.filter(x=>x.indicator.id != item.indicator.id);
    }
    this.filteredSelectedIndicators = this.selectedIndicators;
    this.searchSelected = '';

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
        if (this.mapOfCheckedId[item.sort_id]) {
          this.downloadDisabled = false;
          if (item.indicator.level === 'OUTPUT') {
            this.outputCount++;
          } else if (item.indicator.level === 'IMPACT') {
            this.impactCount++;
          } else if (item.indicator.level === 'OUTCOME') {
            this.outcomeCount++;
          }
        }
        if (!this.mapOfCheckedId[item.sort_id]) {
          this.isAllDisplayDataChecked = false;
        }
      }
    }
    if (this.downloadDisabled) {
      this.indicatorService.setSelectedData(null);
      this.indicatorService.updateNextButton(false);
    } else {
       this.indicatorService.setSelectedData(this.mapOfCheckedId);
      //this.indicatorService.setSelectedData(this.selectedIndicators);
      this.indicatorService.updateNextButton(true);
    }
  }

  formatCrsCode(code: string): string {
    return code ? code.split('.')[0] : '';
  }

  onAfterChange(value: number[]): void {
    this.displayData = this.listOfData.filter((item: ItemData) => value[0] <= item.indicator.numTimes && item.indicator.numTimes <= value[1]);
  }

  /**
   * Filter functions for each column
   * @param list Filter's list
   * @param item Data's item
   */
  filterLevel = (list: string[], item: ItemData) => list.some(value => item.indicator.level.indexOf(value) !== -1 || this.mapOfCheckedId[item.sort_id]);
  filterSector = (list: string[], item: ItemData) => list.some(value => item.indicator.sector.indexOf(value) !== -1 || this.mapOfCheckedId[item.sort_id]);
  filterSource = (list: string[], item: ItemData) => list.some(value => item.indicator.source.some((x)=> {x.name == value}) || this.mapOfCheckedId[item.sort_id]);
  filterSDGCode = (list: string[], item: ItemData) => list.some(value => item.indicator.sdgCode.some((x)=> {x.name == value})  || this.mapOfCheckedId[item.sort_id]);
  filterCRSCode = (list: string[], item: ItemData) => list.some(value => item.indicator.crsCode.some((x)=> {x.name == value}) || this.mapOfCheckedId[item.sort_id]);
  filterDisag = (list: string[], item: ItemData) => list.some(value => item.indicator.disaggregation === (value=='0') || this.mapOfCheckedId[item.sort_id]);


  printArray(array: Array<any>, property?: string): string{
    if(array == null || array.length == 0) return '';
    if(property==null){
      return array.join(', ');
    }else {
      return array.map((x)=>x[property]).join(', ');
    }
  }


  disabledDate = (current: Date): boolean => {
    // Can not select days before today and today
    return differenceInCalendarDays(current, this.today) > 0;
  };

  ngModelCountryChange(row, $event){
    row.countryCodeSelected = $event;
  }

  ngModelYearChange(row, $event:Date){
    row.baseLineValue = null;
    this.indicatorService.getWoldBanlBaselineValue(row.indicator.id, row.countryCodeSelected, $event.getFullYear()).subscribe(data => {
      console.log(data);
      if(data != null && data.length > 0)
        row.baseLineValue = data[0].value;
    });
  }

  removeSelectedIndicator(item: ItemData): void {
    this.selectedIndicators = this.selectedIndicators.filter((x)=>{return x.indicator.id != item.indicator.id});
    this.filteredSelectedIndicators.filter((x)=>{return x.indicator.id != item.indicator.id});
    // If after removing there are no items left according to the filter, but there are still selected indicators
    // show selected indicators
    if(this.filteredSelectedIndicators.length == 0 && this.selectedIndicators.length !=0){
      this.filteredSelectedIndicators = this.selectedIndicators;
    }

    this.mapOfCheckedId[item.sort_id] = false;
    this.refreshStatus();
  }
}
