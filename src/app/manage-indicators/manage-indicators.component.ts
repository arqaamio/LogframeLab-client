import {Component, OnInit} from '@angular/core';
import {IndicatorDto} from "./utils/indicator.dto";

@Component({
  selector: 'app-manage-indicators',
  templateUrl: './manage-indicators.component.html',
  styleUrls: ['./manage-indicators.component.scss']
})
export class ManageIndicatorsComponent implements OnInit {
  totalRowCount: number;
  pageIndex: number;
  pageSize: number;
  indicatorList: IndicatorDto[];

  constructor() {
  }

  ngOnInit(): void {
  }

  search() {

  }
}
