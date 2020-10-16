import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NzModalService } from 'ng-zorro-antd/modal';

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
    private indicatorService: IndicatorService,
    private modal: NzModalService
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
    this.indicatorService.loadingStart.subscribe((data) => {
      this.isSpinning = data;
    });
  }

  pre(): void {
    this.current -= 1;
    if(this.indicatorService.currentStep == 3){
      this.indicatorService.canvasJson = [];
    }

    if(this.indicatorService.currentStep == 4 || this.indicatorService.currentStep == 3){
      this.isSpinning = true;
    }
    this.indicatorService.currentStep = this.current;
  }

  next(): void {
    if (this.current == 3) {
      this.isSpinning = true;
      let json = this.indicatorService.canvasJson;
      let connectioned = [];
      let totalSelected = 0;
      this.indicatorService.statementData.forEach((row) => {
          totalSelected++;
      });
      
      let connection = json.filter(d => d.type === "draw2d.Connection");
      connection.forEach((data) => {
        let sourceNode = data.source.port.split('_')[1];
        let targetNode = data.target.port.split('_')[1];
        
        if(connectioned.indexOf(sourceNode) == -1) {
          connectioned.push(sourceNode);
        }
        if(connectioned.indexOf(targetNode) == -1) {
          connectioned.push(targetNode);
        }
      });
      
      if (totalSelected > connectioned.length) {
        this.isSpinning = false;
        this.modal.confirm({
          nzTitle: 'Are you sure you want to continue?',
          nzContent: 'It seems not all boxes are connected',
          nzCancelText: 'Go Back',
          // nzStyle: {""},
          nzOkText: 'Proceed',
          nzOnOk: () =>
            new Promise((resolve, reject) => {
              this.saveSVGAndProceed();
              this.modal.closeAll();
            }).catch(() => console.log('Oops errors!'))
        });
      } else {
        this.saveSVGAndProceed();
      }
    } else {
        if(this.current === 1 || this.current === 2 || this.current === 3) {
            this.isSpinning = true;
        }
        setTimeout(() => {
          this.current += 1;
          this.indicatorService.currentStep = this.current;
        });
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

  saveSVGAndProceed() {
    this.indicatorService.exportSvg.next('svgExport');
        setTimeout(() => {
          this.isSpinning = false;
          this.current += 1;
          this.indicatorService.currentStep = this.current;
        }, 2000);
  }
}
