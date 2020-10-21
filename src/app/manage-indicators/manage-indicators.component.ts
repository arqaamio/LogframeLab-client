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

}


