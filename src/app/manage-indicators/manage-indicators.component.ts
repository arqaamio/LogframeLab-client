import {Component, OnInit} from '@angular/core';
import {IndicatorDto} from './utils/indicator.dto';
import {ManageIndicatorsService} from '../services/indicators-management/manage-indicators.service';
import {Operation} from './crud-indicator/crud-indicator.component';
import {IndicatorService} from '../services/indicator.service';
import {IndicatorsManagement} from './utils/indicators-management';

@Component({
  selector: 'app-manage-indicators',
  templateUrl: './manage-indicators.component.html',
  styleUrls: ['./manage-indicators.component.scss']
})
export class ManageIndicatorsComponent extends IndicatorsManagement implements OnInit {

  displayCrudModal = false;
  operation: Operation;
  indicator: IndicatorDto;

  constructor(public manageIndicatorsService: ManageIndicatorsService, public indicatorService: IndicatorService) {
    super(manageIndicatorsService, indicatorService);
  }

  ngOnInit(): void {
    this.search(true, false);
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
}


