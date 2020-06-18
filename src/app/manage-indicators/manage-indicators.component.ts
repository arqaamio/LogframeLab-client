import {Component, OnInit} from '@angular/core';
import {IndicatorDto} from './utils/indicator.dto';
import {Sort} from './utils/sort';
import {ManageIndicatorsService} from './service/manage-indicators.service';
import {Operation} from './crud-indicator/crud-indicator.component';

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

  constructor(private manageIndicatorsService: ManageIndicatorsService) {
  }

  ngOnInit(): void {
    this.search();
  }

  search(reset: boolean = false): void {
    if (reset) {
      this.page = 1;
    }

    this.isLoading = true;
    this.manageIndicatorsService.getIndicators(this.page, this.pageSize, this.sortBy).subscribe(
      data => {
        this.isLoading = false;
        if (data.ok) {
          const page = data.body;
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
  }

  refreshIndicatorList() {
    this.search(true);
  }

  edit(ind: IndicatorDto) {
    this.operation = Operation.UPDATE;
    this.displayIndicatorInModal(ind);
  }

  delete(ind: IndicatorDto) {
    this.operation = Operation.DELETE;
    this.displayIndicatorInModal(ind);
  }

  read(ind: IndicatorDto) {
    this.operation = Operation.READ;
    this.displayIndicatorInModal(ind);
  }

  private displayIndicatorInModal(ind: IndicatorDto) {
    this.indicator = ind;
    this.displayCrudModal = true;
  }
}
