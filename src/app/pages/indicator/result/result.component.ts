import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IndicatorService } from 'src/app/services/indicator.service';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent implements OnInit { 
  isVisible: boolean = false;
  selectedIndexObject: any = {};
  editStatement: any = '';

  constructor(private modal: NzModalService, public indicatorService: IndicatorService) { 
    this.indicatorService.updateNextButton(true);
  }

  ngOnInit(): void {
    // result api call
    this.indicatorService.getResult().subscribe((res: any) =>{
      this.indicatorService.loadingStart.next(false);
      this.indicatorService.resultData = res;
      this.indicatorService.collapseData = [
        {
          active: true,
          name: 'Impact',
          status:"active",
          value:70,
          data:  res.impact.map((indicator,i)=>{
            indicator.statusColor = this.setStatus(indicator.status);
            indicator.scoreType = this.setScoreType(indicator.score);
            return {indicator: indicator, sort_id: i + 1}
          })
        },
        {
          active: true,
          name: "Outcome",
          status: "exception",
          value: 30,
          data: res.outcome.map((indicator,i)=>{
            indicator.statusColor = this.setStatus(indicator.status);
            indicator.scoreType = this.setScoreType(indicator.score);
            return {indicator: indicator, sort_id: i + 1}
          })
        },
        {
          active: true,
          name: 'Output',
          status:"success",
          value:100,
          data: res.output.map((indicator,i)=>{
            indicator.statusColor = this.setStatus(indicator.status);
            indicator.scoreType = this.setScoreType(indicator.score);
            return {indicator: indicator, sort_id: i + 1}
          })
        }
      ];
      
    });
  }

  // status wise add class
  setStatus(status){
    if(status == 'good'){
      return 'success';
    } else if(status == 'bad'){
      return 'error';
    } else {
      return 'processing';
    }
  }

  // score wise show progress color class
  setScoreType(score){
    if(score <= 50){
      return 'exception';
    } else if(score <= 80){
      return 'active';
    } else if(score <= 100){
      return 'success';
    }
  }

  // delete statment row
  showDeleteConfirm(collapseIndex, index): void {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to delete this statement?',
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => {
        // remove row
        this.indicatorService.collapseData[collapseIndex].data.splice(index, 1);
      },
      nzCancelText: 'No',
      nzOnCancel: () => {}
    });
  }

  // Edit Statement Open Modal
  edit(collapseIndex, index){
    this.selectedIndexObject = {collapseIndex, index};
    this.editStatement = this.indicatorService.collapseData[collapseIndex].data[index].indicator.statement;
    this.isVisible = true;
  }

  // Update Statement Data
  update(){
    this.indicatorService.collapseData[this.selectedIndexObject.collapseIndex].data[this.selectedIndexObject.index].indicator.statement = this.editStatement;
    this.isVisible = false;
  }

  // Modal cancel event
  handleCancel(){
    this.isVisible = false;
  }
}
