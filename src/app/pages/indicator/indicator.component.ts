import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-indicator',
  templateUrl: './indicator.component.html',
  styleUrls: ['./indicator.component.scss'],
})
export class IndicatorComponent implements OnInit, OnDestroy {
  data = null;
  nextButtonSubscription: Subscription;
  current = 0;
  isNext = false;
  exportSvg: any;
  isSpinning: boolean = false;
  visible: boolean = false;


  constructor(
    private msg: NzMessageService,
    private indicatorService: IndicatorService
  ) { }



  ngOnInit() {
    this.nextButtonSubscription = this.indicatorService
      .getNextButtonSubject()
      .subscribe((data) => {
        if (data != null) {
          if (data.enabled != null) this.isNext = data.enabled;
          if (data.press) this.next();
        }
      });

    this.indicatorService.exportSvg.subscribe((data) => {
      if (data != null) {
        this.exportSvg = data
      }
    });
  }

  onLoading(event){
    console.log("event", event)
    this.isSpinning = event;
  }

  pre(): void {
    this.current -= 1;
    if(this.indicatorService.currentStep == 2){
      this.indicatorService.canvasJson = [];
    }
    this.indicatorService.currentStep = this.current;
  }

  next(): void {
    if (this.current == 2) {
      this.isSpinning = true;
      let json = this.indicatorService.canvasJson;
      let connectioned = [];
      let totalSelected = 0;
      for(const field in this.indicatorService.selectedData){
        if(this.indicatorService.selectedData[field]){
          totalSelected++;
        }
      }
      let connection = json.filter(d => d.type === "draw2d.Connection");
      connection.forEach((data) => {
        let sourceNode = data.source.port.split('_')[1]
        let targetNode = data.target.port.split('_')[1]
        if (this.indicatorService.selectedData.hasOwnProperty(sourceNode)) {
          if(this.indicatorService.selectedData[sourceNode] == true){
            if (connectioned.indexOf(sourceNode) == -1) {
              connectioned.push(sourceNode);
            }
          }
        }
        if (this.indicatorService.selectedData.hasOwnProperty(targetNode)) {
          if(this.indicatorService.selectedData[targetNode] == true){
            if (connectioned.indexOf(targetNode) == -1) {
              connectioned.push(targetNode);
            }
          }
        }
      });
    
      if (totalSelected > connectioned.length) {
        this.isSpinning = false;
        this.msg.error("Please make sure all the logical boxes are connected before you more to the next step.")
      } else {
        this.indicatorService.exportSvg.next('svgExport');
        setTimeout(() => {
          this.isSpinning = false;
          this.current += 1;
          this.indicatorService.currentStep = this.current;
        }, 2000);
      }
    } else {

      if (this.current === 1) {
        this.isSpinning = true;
      }
      setTimeout(() => {
        this.current += 1;
        this.indicatorService.currentStep = this.current;
      })

    }
  }

  done(): void {
    this.current = 0;
    this.indicatorService.clearIndicatorData();
  }

  ngOnDestroy() {
    this.nextButtonSubscription.unsubscribe();
  }

  clickClose(): void {
    this.visible = false;
  }

  change(value: boolean): void {
    console.log(value);
  }
}
