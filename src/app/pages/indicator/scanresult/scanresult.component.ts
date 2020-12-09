import { Component, OnInit, OnDestroy, AfterViewInit, AfterViewChecked, EventEmitter, Output } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs/internal/Subscription';
import Utils from 'src/app/utils/utils';
import { IndicatorResponse } from 'src/app/models/indicatorresponse.model';
import { FilterData } from 'src/app/services/dto/filter-data.dto';
import { take } from 'rxjs/internal/operators/take';
import { tap } from 'rxjs/internal/operators/tap';
import differenceInCalendarDays from 'date-fns/differenceInCalendarDays';
import { WorldBankService } from '../../../services/worldbank.service';

interface ItemData {
  indicator: IndicatorResponse;
  countryCodeSelected:string;
  yearSelected:Date;
  baselineValue:any;
  statement: any;

  colorLevel:string;
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
export const WORLD_BANK_SOURCE_ID: number = 2;
export const NO_VALUE: string = 'No Value';
export const DISAG_YES_FILTER_DATA: FilterData = {text: 'Yes', value:0};
export const DISAG_NO_FILTER_DATA: FilterData = {text: 'No', value:1};
export const EMPTY_ACTIVE_ITEM: ItemData = {indicator: null, colorLevel: '', baselineValue: 0, yearSelected: new Date(), countryCodeSelected: '', statement: null};
export const COLOR_LEVEL = {'IMPACT': '#453457', 'OUTCOME': '#6B3C53', 'OUTPUT': '#637743'};
@Component({
  selector: 'app-scanresult',
  templateUrl: './scanresult.component.html',
  styleUrls: ['./scanresult.component.scss'],
})
export class ScanResultComponent implements OnInit, OnDestroy {
  indicatorSubscription: Subscription = null;

  downloadDisabled = true;
  mapOfCheckedId: { [key: string]: boolean } = {};
  mapOfCheckedStatementsId: { [key: string]: boolean } = {};
  listOfData: ItemData[] = [];
  displayData: ItemData[] = [];
  selectedIndicators: ItemData[] = [];
  filteredSelectedIndicators: ItemData[] = [];
  searchFilter: SearchFilter = new SearchFilter();
  sortName: string | null = null;
  sortValue: string | null = null;
  searchValue = '';
  searchSelected = '';
  impactCount = 0;
  outcomeCount = 0;
  outputCount = 0;
  showLoading = true;
  showLoadingBaseline: boolean = false;
  showScoreCol = true;
  isPropertiesModalActive: boolean = false;
  isPopOverVisible: boolean = false;
  activeItem: ItemData = EMPTY_ACTIVE_ITEM;
  impactStatements = [];
  outcomeStatements = [];
  outputStatements = [];
  statementData = [];
  myOptions = {
    placement: 'top',
    trigger: 'hover',
    theme: 'light',
    'hide-delay': 0,
  };

  countriesList = [];

  expandSet = new Set<number>();

  constructor(private indicatorService: IndicatorService, private worldBankService: WorldBankService) {}

  ngOnInit(): void {

    this.indicatorSubscription = this.indicatorService
      .getIndicatorSubject()
      .pipe(
        take(1),
        tap((data) => {
        let isNewInfo = data==null ? true : data.isNewInfo;
        // show keyword column if document was uploaded
        this.showScoreCol = data != null && data.dataResponse != null;
        if(data!=null){
          // with document
          if (isNewInfo && data.dataResponse != null) {
            console.log("with document");
            this.listOfData = data.dataResponse.map((indicator,i)=>{
              return {
                indicator: indicator,
                colorLevel: COLOR_LEVEL[indicator.level],
                countryCodeSelected: null,
                yearSelected: null,
                baselineValue: null
              }});
            this.addFilters();
            this.indicatorService.setLoadedData(this.listOfData);
            this.displayData = this.listOfData;

            this.showLoading = false;
          }

          // without document
          if (isNewInfo && data.dataResponse == null){
            console.log("Without document");
            this.indicatorService.getIndicators(data.filters).subscribe((response) => {

              if(response != null && response.length > 0) {
                this.listOfData = response.map((indicator,i)=>{return {
                  indicator: indicator,
                  colorLevel: COLOR_LEVEL[indicator.level],
                  countryCodeSelected: null,
                  yearSelected: null,
                  baselineValue: null,
                  statement: null
                }});
                this.addFilters();
                this.indicatorService.setLoadedData(this.listOfData);
                this.displayData = this.listOfData;
                this.showLoading = false;
              }
            });
          }

          // without changes in the filters or documents
          if(!data.isNewInfo && data.dataResponse != null){
            console.log("No changes");
            this.listOfData = data.dataResponse;
            this.displayData = this.listOfData;
            if(data.selectedData != null) {
              this.selectedIndicators = this.filteredSelectedIndicators = data.selectedData;
              this.listOfData.forEach((x, i)=>{
                if(this.selectedIndicators.find(y=>y.indicator.id == x.indicator.id)){
                  this.mapOfCheckedId[x.indicator.id] = true;
                }
              });
              this.refreshStatus();
            }
            this.addFilters();
            this.showLoading = false;
          } 

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

      this.worldBankService.getWorldBankCountries().subscribe(data => {
        console.log('get worldbank countries');
        Object.keys(data).forEach(item => {
          this.countriesList.push({
            label: data[item],
            code: item
          });
        });

        // Sort countries by its label
        this.countriesList.sort((left, right): number => {
          if (left.label < right.label) return -1;
          if (left.label > right.label) return 1;
          return 0;
        });
      });

      this.statementData = this.indicatorService.statementData ? this.indicatorService.statementData : [];
      this.impactStatements = this.statementData.filter(x=>x.level=='IMPACT');
      this.outcomeStatements = this.statementData.filter(x=>x.level=='OUTCOME');
      this.outputStatements = this.statementData.filter(x=>x.level=='OUTPUT');
  }
  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
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
    this.refreshStatus();
  }

  /**
   * Triggered when selected item in the table
   * Updates the list of selected indicators and clear search of selected indicator
   * @param item ItemData indicator
   * @param selected Forced selected state of the indicator
   */
  selectIndicator(item: ItemData, selected?: boolean) {
    this.indicatorService.canvasJson = [];
    // Set item selected state. Should be selected if properties modal is open
    this.mapOfCheckedId[item.indicator.id] = selected ? selected : !this.mapOfCheckedId[item.indicator.id] || this.isPropertiesModalActive;
    this.selectedIndicators = this.selectedIndicators.filter(x=>x.indicator.id != item.indicator.id);

    if(this.mapOfCheckedId[item.indicator.id]){
      this.selectedIndicators.push(item);
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
      for (let item of this.displayData) {
        if (this.mapOfCheckedId[item.indicator.id]) {
          this.downloadDisabled = false;
          if (item.indicator.level === 'OUTPUT') {
            this.outputCount++;
          } else if (item.indicator.level === 'IMPACT') {
            this.impactCount++;
          } else if (item.indicator.level === 'OUTCOME') {
            this.outcomeCount++;
          }
        }
      }
    }
    if (this.downloadDisabled) {
      this.indicatorService.setSelectedData(null);
      this.indicatorService.updateNextButton(false);
    } else {
      this.indicatorService.setSelectedData(this.selectedIndicators);
      this.indicatorService.updateNextButton(true);
    }
  }

  formatCrsCode(code: string): string {
    return code ? code.split('.')[0] : '';
  }

  onAfterChange(value: number[]): void {
    this.displayData = this.listOfData.filter((item: ItemData) => value[0] <= item.indicator.score && item.indicator.score <= value[1]);
  }

  /**
   * Filter functions for each column
   * @param list Filter's list
   * @param item Data's item
   */
  filterLevel = (list: string[], item: ItemData) => list.some(value => item.indicator.level.indexOf(value) !== -1);
  filterSector = (list: string[], item: ItemData) => list.some(value => item.indicator.sector.indexOf(value) !== -1);
  filterSource = (list: number[], item: ItemData) => list.some(value => item.indicator.source.some(x=> x.id == value));
  filterSDGCode = (list: number[], item: ItemData) => list.some(value => item.indicator.sdgCode.some(x=> x.id == value));
  filterCRSCode = (list: number[], item: ItemData) => list.some(value => item.indicator.crsCode.some(x=> x.id == value));
  filterDisag = (list: string[], item: ItemData) => list.some(value => item.indicator.disaggregation === (value=='0'));


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
    return differenceInCalendarDays(current, new Date()) > 0;
  };

  ngModelCountryChange(item, code){
    item.baselineValue = null;
    item.countryCodeSelected = code;
    this.getWorldBankBaselineValue(item);
  }

  ngModelYearChange(item, date:Date){
    item.baselineValue = null;
    item.yearSelected = date;
    this.getWorldBankBaselineValue(item);
  }

  getWorldBankBaselineValue(item: ItemData) {
    if(item.countryCodeSelected && item.yearSelected){
      this.showLoadingBaseline = true
      this.worldBankService.getWorldBankBaselineValue(item.indicator.id, item.countryCodeSelected, item.yearSelected.getFullYear()).subscribe(data => {
        console.log(data);
        if(data != null && data.length > 0)
          item.baselineValue = data[0].value;
        else
          item.baselineValue = NO_VALUE;
        this.showLoadingBaseline = false;
      }, error=> {
        this.showLoadingBaseline = false;
        item.baselineValue = NO_VALUE;
        throw error;
      });
    }
  }

  /**
   * Retrieves the most recent baseline value for the selected indicator
   */
  getLatestBaselineValue(): void {
    this.showLoadingBaseline = true;
    this.worldBankService.getWorldBankBaselineValue(this.activeItem.indicator.id, this.activeItem.countryCodeSelected).subscribe(data => {
      if(data != null && data.length > 0){
        const latest = data[data.length -1];
        this.activeItem.baselineValue = latest.value;
        this.activeItem.yearSelected = new Date();
        this.activeItem.yearSelected.setFullYear(Number(latest.date));
      } else{
        this.activeItem.baselineValue = NO_VALUE;
        this.activeItem.yearSelected = null;
      }
      this.showLoadingBaseline = false;
    }, error=> {
      this.showLoadingBaseline = false;
      this.activeItem.baselineValue = NO_VALUE;
      this.activeItem.yearSelected = null;
      throw error;
    });
  }

  onExpandChange(id: number, checked: boolean): void {
    checked ? this.expandSet.add(id) : this.expandSet.delete(id);
  }

  removeSelectedIndicator(item: ItemData): void {
    this.selectedIndicators = this.selectedIndicators.filter((x)=>{return x.indicator.id != item.indicator.id});
    this.filteredSelectedIndicators = this.filteredSelectedIndicators.filter((x)=>{return x.indicator.id != item.indicator.id});
    // If after removing there are no items left according to the filter, but there are still selected indicators
    // show selected indicators
    if(this.filteredSelectedIndicators.length == 0 && this.selectedIndicators.length !=0){
      this.filteredSelectedIndicators = this.selectedIndicators;
    }

    this.mapOfCheckedId[item.indicator.id] = false;
    this.refreshStatus();
  }

  /**
   * Returns true if indicator has a source of the World Bank
   * @param indicator Indicator
   */
  isWorldBankIndicator(item: ItemData): boolean {
    return item.indicator?.source?.find(x=>x.id==WORLD_BANK_SOURCE_ID) != null;
  }
  
  showPropertiesModal(indicator: ItemData): void {
    this.activeItem = indicator;
    switch(this.activeItem.indicator.level){
      case 'IMPACT':
        this.statementData = this.impactStatements;
        break;
      case 'OUTCOME':
        this.statementData = this.outcomeStatements;
        break;
      case 'OUTPUT':
        this.statementData = this.outputStatements;
        break;
    }
    this.mapOfCheckedStatementsId = {};
    if(this.activeItem.statement) {
      this.mapOfCheckedStatementsId[this.activeItem.statement.id] = true;
    }
    this.isPropertiesModalActive = true;
  }

  propertiesModalOkHandle(): void {
    this.isPropertiesModalActive = false;
    this.mapOfCheckedStatementsId = {};
    this.activeItem = EMPTY_ACTIVE_ITEM;
  }

  selectStatement(statement, selected): void {
    this.mapOfCheckedStatementsId = {};
    if(selected) {
      this.mapOfCheckedStatementsId[statement.id] = true;
      this.activeItem.statement = statement;
    } else {
      this.activeItem.statement = null;
    }
  }

  /**
   * Set filters for the table
   */
  addFilters(): void {
    let mapLevels: Map<string, FilterData> = new Map();
    let mapSource: Map<string, FilterData> = new Map();
    let mapSDGCode: Map<string, FilterData> = new Map();
    let mapCRSCode: Map<string, FilterData> = new Map();
    let mapSector: Map<string, FilterData> = new Map();
    let mapDisag: Map<string, FilterData> = new Map();


    this.listOfData.forEach((x)=>{
      if(x.indicator){
        mapLevels.set(x.indicator.level,new FilterData(x.indicator.level));
        x.indicator.source?.forEach((z)=> mapSource.set(z.id.toString(),{text:z.name, value: z.id}));
        x.indicator.sdgCode?.forEach((z)=> mapSDGCode.set(z.id.toString(),{text:z.name, value: z.id}));
        x.indicator.crsCode?.forEach((z)=> mapCRSCode.set(z.id.toString(),{text:z.name, value: z.id}));
        mapDisag.set(x.indicator.disaggregation + '', x.indicator.disaggregation ? DISAG_YES_FILTER_DATA: DISAG_NO_FILTER_DATA);
        mapSector.set(x.indicator.sector,new FilterData(x.indicator.sector));
      }
    })
    mapLevels.forEach((value, _)=> {this.searchFilter.level = [...this.searchFilter.level, value];});
    mapSource.forEach((value, _)=> {this.searchFilter.source = [...this.searchFilter.source, value];});
    mapSDGCode.forEach((value, _)=> {this.searchFilter.sdgCode = [...this.searchFilter.sdgCode, value];});
    mapCRSCode.forEach((value, _)=> {this.searchFilter.crsCode= [...this.searchFilter.crsCode, value];});
    mapSector.forEach((value, _)=> {this.searchFilter.sector = [...this.searchFilter.sector, value];});
    mapDisag.forEach((value, _)=> {this.searchFilter.disaggregation = [...this.searchFilter.disaggregation, value];});
  }
}
