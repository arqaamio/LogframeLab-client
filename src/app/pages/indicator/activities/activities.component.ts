import { Component, OnInit } from '@angular/core';
import {FilterDto} from '../../../services/dto/filter.dto';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  filterOptions = new FilterDto();
  statementData = [];
  outputData = [];
  loading = false;
  activityList = [];
  selectedOutput;
  activityName;

  constructor() { }

  activities;

  current = 0;

  // index = '<app-add-activities></app-add-activities>';

  ngOnInit(): void {

  }

  pre(): void {
    this.current -= 1;
    // this.changeContent();
  }

  next(): void {
    this.current += 1;
    // this.changeContent();
  }

  done(): void {
    console.log('done');
  }

  // changeContent(): void {
  //   switch (this.current) {
  //     case 0: {
  //       this.index = '<app-add-activities></app-add-activities>';
  //       break;
  //     }
  //     case 1: {
  //       this.index = 'Second-content';
  //       break;
  //     }
  //     case 2: {
  //       this.index = 'third-content';
  //       break;
  //     }
  //     default: {
  //       this.index = 'error';
  //     }
  //   }
  // }

}
