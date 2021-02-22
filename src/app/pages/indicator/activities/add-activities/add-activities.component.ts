import {Component, OnInit} from '@angular/core';
import {IndicatorService} from '../../../../services/indicator.service';
import {FilterDto} from '../../../../services/dto/filter.dto';
import {RxStompService} from '@stomp/ng2-stompjs';
import {NzModalService} from 'ng-zorro-antd/modal';
import {ActivitiesService} from '../../../../services/activities.service';

@Component({
  selector: 'app-add-activities',
  templateUrl: './add-activities.component.html',
  styleUrls: ['./add-activities.component.scss']
})
export class AddActivitiesComponent implements OnInit {
  filterOptions = new FilterDto();
  statementData = [];
  outputData = [];
  loading = false;
  activityList = [];
  selectedOutput;
  activityName;

  constructor(
    private activitiesService: ActivitiesService,
    private indicatorService: IndicatorService,
    private rxStompService: RxStompService,
    private modalService: NzModalService) {

    this.rxStompService.deactivate();
  }

  ngOnInit(): void {

    console.log(this.indicatorService.statementData);
    this.getStatementData();


  }

  setActivities(){
    console.log(this.selectedOutput)
    if(this.selectedOutput === '' || this.selectedOutput === undefined){
      this.modalService.error({
        nzTitle: 'An error has occurred',
        nzContent: 'An Output has to be selected with an Activity'
      });
    }else{
      this.activityList.push({name:this.activityName,output:this.selectedOutput})
      this.activitiesService.activitiesList.push({name:this.activityName,output:this.selectedOutput})
    }
  }

  getStatementData() {
    this.statementData = this.indicatorService.statementData;

    this.indicatorService.statementData.forEach((statement) => {
      if (statement.level === 'OUTPUT') {
        console.log(statement)
        this.outputData.push(statement.statement)
      }
    })
  }

  delete(value){
    this.activityList = this.deleteActivity(this.activityList,value);
    this.activitiesService.activitiesList = this.activityList;
  }

  deleteActivity(arr, value){
    return arr.filter(ele => ele.name !== value);
  }


}
