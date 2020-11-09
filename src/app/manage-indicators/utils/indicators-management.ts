import {FilterDto} from '../../services/dto/filter.dto';
import {FilterData} from '../../services/dto/filter-data.dto';
import {IndicatorDto} from './indicator.dto';
import {ManageIndicatorsService} from '../../services/indicators-management/manage-indicators.service';
import {IndicatorService} from '../../services/indicator.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Operation } from '../crud-indicator/crud-indicator.component';

export class IndicatorsManagement {

  totalRowCount: number;
  page = 1;
  pageSize = 10;
  indicatorList: IndicatorDto[] = [];
  isLoading = false;
  displayCrudModal = false;
  operation: Operation;
  indicator: IndicatorDto;

  sectorFilter: FilterData[] = [];
  sourceFilter: FilterData[] = [];
  levelFilter: FilterData[] = [];
  sdgCodeFilter: FilterData[] = [];
  crsCodeFilter: FilterData[] = [];

  filters = new FilterDto();

  hasFilters = false;

  constructor(public manageIndicatorsService: ManageIndicatorsService, public indicatorService: IndicatorService) {
  }

  private static processFilter(value: string): FilterData {
    const filter = new FilterData();
    filter.text = value;
    filter.value = value;
    return filter;
  }

  processFilters(filters: FilterDto) {
    if (this.hasFilters) {
      return;
    }
    this.sectorFilter = filters.sector.map(IndicatorsManagement.processFilter);
    this.sectorFilter = [{text: '(blank)', value:''}, ...this.sectorFilter];
    this.sourceFilter = filters.source.map(this.mapFilter);
    this.sourceFilter = [{text: '(blank)', value:''}, ...this.sourceFilter];
    this.levelFilter = filters.level.map(this.mapFilter);
    this.levelFilter = [{text: '(blank)', value:''}, ...this.levelFilter];
    this.sdgCodeFilter = filters.sdgCode.map(this.mapFilter);
    this.sdgCodeFilter = [{text: '(blank)', value:''}, ...this.sdgCodeFilter];
    this.crsCodeFilter = filters.crsCode.map(this.mapFilter);
    this.crsCodeFilter = [{text: '(blank)', value:''}, ...this.crsCodeFilter];

    this.hasFilters = true;
  }

  search(reset: boolean, forApproval: boolean): void {
    if (reset) {
      this.page = 1;
    }

    this.isLoading = true;

    const filtersRequest = this.indicatorService.getFilters();
    const indicatorsRequest = forApproval
      ? this.manageIndicatorsService.getIndicatorsForApproval(this.page, this.pageSize, this.filters)
      : this.manageIndicatorsService.getIndicators(this.page, this.pageSize, this.filters);

    forkJoin([filtersRequest, indicatorsRequest]).subscribe(results => {
      const filters = results[0];

      this.processFilters(filters);

      this.isLoading = false;
      if (results[1].ok) {
        const page = results[1].body;
        this.totalRowCount = page.totalElements;
        this.indicatorList = page.content;
      }
    });
  }

  addFilter(filterKey: string, value: string[]) {
    this.filters[filterKey] = value;
    this.search(true, false);
  }

  mapFilter(value): FilterData {
    const filter = new FilterData();
    filter.text = value.name;
    filter.value = value.id;
    return filter;
  }

  printArray(array: Array<any>, property?: string): string{
    if(array == null || array.length == 0) return '';
    if(property==null){
      return array.join(', ');
    }else {
      return array.map((x)=>x[property]).join(', ');
    }
  }

  /**
   * Refresh indicator list with new API request
   * @param refresh Wether to refresh to page 1
   */
  refreshIndicatorList(refresh: boolean) {
    this.search(refresh, false);
  }

  edit(ind: IndicatorDto) {
    this.displayIndicatorInModal(Operation.UPDATE, ind);
  }

  delete(ind: IndicatorDto) {
    this.displayIndicatorInModal(Operation.DELETE, ind);
  }

  read(ind: IndicatorDto) {
    this.displayIndicatorInModal(Operation.READ, ind);
  }

  private displayIndicatorInModal(operation: Operation, ind: IndicatorDto) {
    this.operation = operation;
    this.indicator = ind;
    this.displayCrudModal = true;
  }

  hideCrudModal(event) {
    this.displayCrudModal = !event;
    this.operation = undefined;
    this.indicator = undefined;
  }
}
