import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { MachineLearningService } from 'src/app/services/machinelearning.service';

export class TableItem {
  statement: string;
  score: number;
  level: string;
  gradient: object;
  colorLevel: string;
  statusColor: string;
  id: number;
}

export enum Level {
  IMPACT = 'impact',
  OUTCOME = 'outcome',
  OUTPUT = 'output'
}

export const GRADIENT_GREEN = { '0%': 'red', '50%': 'yellow',  '100%': 'green' };
export const GRADIENT_LIGHT_GREEN = { '0%': 'red', '50%': 'yellow',  '175%': 'lightgreen' };
export const GRADIENT_YELLOW = { '0%': 'red', '100%': 'yellow' };
export const GRADIENT_ORANGE = { '0%': 'red', '100%': 'orange' };
export const GRADIENT_RED = { '0%': 'red', '100%': 'red'};

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit {
  isVisible: boolean = false;
  selectedIndexObject: any = {};
  editStatement: any = '';
  editId: string = null;
  listOfData = [];
  levelFilter = [{text:'OUTPUT', value: 'OUTPUT'}, {text:'OUTCOME', value: 'OUTCOME'}, {text:'IMPACT', value: 'IMPACT'}];
  statusFilter= [{text:'GOOD', value:'GOOD'}, {text:'BAD', value: 'BAD'}];
  maxId:number = 0;

  constructor(public indicatorService: IndicatorService, public machineLearningService: MachineLearningService) { 
    this.indicatorService.updateNextButton(true);
  }

  ngOnInit(): void {
    // result api call
    this.machineLearningService.getStatements().subscribe((res: object) =>{
      this.indicatorService.loadingStart.next(false);
      
      this.listOfData = [...res[Level.IMPACT].map((x)=> {
        x.level = this.levelFilter[2].text;
        this.setLevelColor(x);
        this.setStatusColor(x);
        this.setScoreGradient(x);
        x.id = this.maxId++;
        return x;
      }),
        ...res[Level.OUTCOME].map((x)=> {
          x.level = this.levelFilter[1].text;
          this.setLevelColor(x);
          this.setStatusColor(x);
          this.setScoreGradient(x);
          x.id = this.maxId++;
          return x;
       }),
         ...res[Level.OUTPUT].map((x)=> {
          x.level = this.levelFilter[0].text;
          this.setLevelColor(x);
          this.setStatusColor(x);
          this.setScoreGradient(x);
          x.id = this.maxId++;
          return x;
      })];
      this.updateStatementData();
    });
  }

  // status wise add class
  setStatusColor(x){
    x.status = x.status.toUpperCase();
    if(x.status == 'GOOD'){
      x.statusColor = 'green';
    } else if(x.status == 'BAD'){
      x.statusColor = 'red';
    } else {
      x.statusColor = 'yellow';
    }
  }

  // score wise show progress color class
  setScoreGradient(x){
    
    if(x.score <= 10){
      x.gradient = GRADIENT_RED;
    } else if(x.score <= 25){
      x.gradient = GRADIENT_ORANGE;
    } else if(x.score <= 50){
      x.gradient = GRADIENT_YELLOW;
    } else if(x.score <= 75){
      x.gradient = GRADIENT_LIGHT_GREEN;
    } else {
      x.gradient = GRADIENT_GREEN;
    }
  }

  setLevelColor(listItem) {
    switch(listItem.level) {
      // OUTPUT
      case this.levelFilter[0].text:
        listItem.colorLevel = "#637743";
        break;
      // OUTCOME
      case this.levelFilter[1].text:
        listItem.colorLevel = "#6B3C53";
        break;
      // IMPACT
      case this.levelFilter[2].text:
        listItem.colorLevel = "#453457";
        break;
    }
  }
  
  startEdit(id: string): void {
    console.log("StartEdit: ", id);
    this.editId = id;
  }

  stopEdit(listItem): void {
    this.setLevelColor(listItem);
    this.editId = null;
    this.updateStatementData();
  }

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.maxId++
      }
    ];
    this.updateStatementData();
  }

  deleteRow(index: number): void {
    console.log("Delete row:", index);
    this.listOfData = this.listOfData.filter((d, i) => i != index);
    this.updateStatementData();
  }

  validateStatement(index: number): void {
    console.log("Validate index", index);
    
    this.machineLearningService.validateStatement(this.listOfData[index].statement)
       .subscribe(x => {
        this.updateStatementData();
     });
  }

  updateStatementData(): void {
    this.indicatorService.statementData = this.listOfData;
  }
  /**
   * Filter functions for each column
   * @param list Filter's list
   * @param item Data's item
   */
  filterLevel = (list: string[], item) => list.some(value => item.level.indexOf(value) !== -1);
  filterStatus = (list: string[], item) => list.some(value => item.status.indexOf(value) !== -1);

}
