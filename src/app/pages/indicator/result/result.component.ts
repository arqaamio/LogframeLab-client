import { Component, OnDestroy, OnInit } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { MachineLearningService } from 'src/app/services/machinelearning.service';
import { take, tap } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { NzMessageService } from 'ng-zorro-antd/message';

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
export class ResultComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  isVisible: boolean = false;
  selectedIndexObject: any = {};
  editStatement: any = '';
  editId: string = null;
  listOfData = [];
  levelFilter = [{text:'OUTPUT', value: 'OUTPUT'}, {text:'OUTCOME', value: 'OUTCOME'}, {text:'IMPACT', value: 'IMPACT'}];
  statusFilter= [{text:'GOOD', value:'GOOD'}, {text:'BAD', value: 'BAD'}];
  maxId: number = 0;
  isModalVisible = false;
  addAssumption: string = null;
  getStatementId: number;

  constructor(
    public indicatorService: IndicatorService,
    public machineLearningService: MachineLearningService,
    public messageService: NzMessageService
  ) {
    this.indicatorService.updateNextButton(true);
  }

  ngOnInit(): void {
    this.indicatorService.initVisualization();
    if(this.indicatorService.statementData.length > 0) {
      this.listOfData = this.indicatorService.statementData;
      this.listOfData.forEach((element) => {
        if(element.id > this.maxId) {
          this.maxId = element.id;
        }
      });
      this.indicatorService.loadingStart.next(false);
    } else {
      this.subscription = this.indicatorService.getIndicatorSubject().pipe(take(1),
        tap((data) => {
        if(data.files == null || data.files.length == 0) {
          this.messageService.info('No document was uploaded');
        } else {
          // result api call
          this.subscription = this.machineLearningService.getStatements(data.files[0]).subscribe((event: HttpEvent<any>) => {
            switch (event.type) {
              case HttpEventType.Response:
                let res = event.body;
                res[Level.IMPACT] = res[Level.IMPACT] ? res[Level.IMPACT] : [];
                res[Level.OUTCOME] = res[Level.OUTCOME] ? res[Level.OUTCOME] : [];
                res[Level.OUTPUT] = res[Level.OUTPUT] ? res[Level.OUTPUT] : [];
                
                if(res[Level.IMPACT].length == 0 && res[Level.OUTCOME].length == 0 && res[Level.OUTPUT].length == 0){
                  this.messageService.info('No statements were found on the document');
                } else
                this.listOfData = [
                  ...res[Level.IMPACT].map((x)=> {
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
                  })
                ];
              this.updateStatementData();
              this.indicatorService.loadingStart.next(false);
              break;
            }
          });
        }
      })).subscribe();
    }
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

  handleCancelModal() {
    this.isModalVisible = false;
  }

  saveSource() {
    this.listOfData.map((val) => {
      if(val.id == this.getStatementId) {
        val['assumption'] = this.addAssumption;
      }
    });
    this.addAssumption = null;
    this.isModalVisible = false;
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
    this.editId = null;
    this.updateStatementData();
  }

  addRow(): void {
    this.maxId = this.maxId+ 1;
    this.listOfData = [
      ...this.listOfData,
      {
        id: this.maxId
      }
    ];
    this.updateStatementData();
  }

  addAssumptions(getRow) {
    this.getStatementId = getRow.id;
  }

  deleteRow(index: number): void {
    console.log("Delete row:", index);
    this.listOfData = this.listOfData.filter((d, i) => i != index);
    this.updateStatementData();
  }

  validateStatement(index: number): void {
    if(this.listOfData[index].level == null) {
      this.messageService.error("To validate a statement it must have a level set.")
      return;
    }
    console.log("Validate index", index);

    this.machineLearningService.validateStatement(this.listOfData[index].statement, this.listOfData[index].level)
      .subscribe(res => {
        this.listOfData[index].score = res.score;
        this.listOfData[index].status = res.status;
        this.setStatusColor(this.listOfData[index]);
        this.setScoreGradient(this.listOfData[index]);
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

  levelChangeHandle(listItem){
    this.setLevelColor(listItem);
    this.updateStatementData();
  }

  ngOnDestroy() {
    if(this.subscription)
      this.subscription.unsubscribe();
  }
}
