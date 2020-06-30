import {Component, OnInit} from '@angular/core';
import {IndicatorDto} from './utils/indicator.dto';
import {Sort} from './utils/sort';
import {ManageIndicatorsService} from '../services/indicators-management/manage-indicators.service';
import {Operation} from './crud-indicator/crud-indicator.component';
import {forkJoin} from 'rxjs';
import {IndicatorService} from '../services/indicator.service';
import {FilterDto} from '../services/dto/filter.dto';

@Component({
  selector: 'app-manage-indicators',
  templateUrl: './manage-indicators.component.html',
  styleUrls: ['./manage-indicators.component.scss']
})
export class ManageIndicatorsComponent implements OnInit {
  totalRowCount: number;
  page = 1;
  pageSize = 10;
  indicatorList: IndicatorDto[];
  isLoading = false;
  sortBy: Sort;

  displayCrudModal = false;
  operation: Operation;
  indicator: IndicatorDto;

  themeFilter: FilterData[];
  sourceFilter: FilterData[];
  levelFilter: FilterData[];
  sdgCodeFilter: FilterData[];
  crsCodeFilter: FilterData[];

  filters = new FilterDto();

  hasFilters = false;

  constructor(private manageIndicatorsService: ManageIndicatorsService, private indicatorService: IndicatorService) {
  }

  ngOnInit(): void {
    this.search();
  }

  search(reset: boolean = false): void {
    if (reset) {
      this.page = 1;
    }

    this.isLoading = true;

    const filtersRequest = this.indicatorService.getFilters();
    const indicatorsRequest = this.manageIndicatorsService.getIndicators(this.page,
      this.pageSize,
      this.filters,
      this.sortBy);

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

  sort(event: { key: string; value: string }) {
    this.sortBy = new Sort(event);
    this.search();
  }

  create() {
    this.operation = Operation.CREATE;
    this.displayCrudModal = true;
  }

  hideCrudModal(event) {
    this.displayCrudModal = !event;
    this.operation = undefined;
    this.indicator = undefined;
  }

  refreshIndicatorList() {
    this.search(true);
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

  addFilter(filterKey: string, value: string[]) {
    this.filters[filterKey] = value;
  }

  fetchByFilters() {
    this.search();
  }

  private processFilters(filters: FilterDto) {
    if (this.hasFilters) {
      return;
    }
    this.themeFilter = filters.themes.map<FilterData>(processFilter);
    this.sourceFilter = filters.source.map<FilterData>(processFilter);
    this.levelFilter = filters.level.map(level => {
      const filter = new FilterData();
      filter.text = level.name;
      filter.value = level.id;
      return filter;
    });
    this.sdgCodeFilter = filters.sdgCode.map<FilterData>(processFilter);
    this.crsCodeFilter = filters.crsCode.map<FilterData>(processFilter);

    this.hasFilters = true;
  }

  private displayIndicatorInModal(operation: Operation, ind: IndicatorDto) {
    this.operation = operation;
    this.indicator = ind;
    this.displayCrudModal = true;
  }
}

function processFilter(value: string) {
  const filter = new FilterData();
  filter.text = value;
  filter.value = value;
  return filter;
}

class FilterData {
  text: string;
  value: any;
}
