import { Component, OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Router } from '@angular/router';

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
    private messageService: NzMessageService,
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    // To reload when clicking on the logo while already on the route
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };  
    this.nextButtonSubscription = this.indicatorService
      .getNextButtonSubject()
      .subscribe((data) => {        
        if (data != null) {
          if (data.enabled != null && data.enabled!=this.isNext) this.isNext = data.enabled;
          if (data.press) this.next(data.force);
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
    this.indicatorService.currentStep = this.current;
    if(this.indicatorService.currentStep == 0) {
      this.indicatorService.setLoadedData(null);
      this.indicatorService.statementData = [];
    }
    if(this.indicatorService.currentStep == 2){
      this.indicatorService.canvasJson = [];
    }

    if(this.indicatorService.currentStep == 3 || this.indicatorService.currentStep == 2){
      this.isSpinning = true;
    }
  }

  next(forcePress?: boolean): void {
    if( this.current === 0 && !forcePress) {
      this.indicatorService.getNextButtonSubject().next({pressed: true});
    } else if (this.current == 1) {
      if(this.indicatorService.statementData?.filter(x=>x.level =='IMPACT').length > 1){
        this.modal.confirm({
          nzTitle: 'Are you sure you want to continue?',
          nzContent: 'There should be only 1 Impact statement',
          nzCancelText: 'Go Back',
          nzOkText: 'Proceed',
          nzOnOk: () =>
            new Promise((resolve, reject) => {
            this.isSpinning = true;
            this.current += 1;
            this.indicatorService.currentStep = this.current;
            this.modal.closeAll();
            }).catch(() => console.log('Oops errors!'))
        });
      } else if(this.indicatorService.statementData?.filter(x=>x.level == null).length > 0){
        this.messageService.error('Set level for all statements');
      } else if(this.indicatorService.statementData?.filter(x=>x.statement == null || x.statement.trim() == '').length > 0){
        this.messageService.error('Set statement for all statements');
      }else {
        this.isSpinning = true;
        this.current += 1;
        this.indicatorService.currentStep = this.current;
      }
    }else if (this.current == 3) {
      this.isSpinning = true;
      let json = this.indicatorService.canvasJson;
      let connectioned = [];
      
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
      
      if (this.indicatorService.statementData.length > connectioned.length) {
        this.isSpinning = false;
        this.modal.confirm({
          nzTitle: 'Are you sure you want to continue?',
          nzContent: 'It seems not all boxes are connected',
          nzCancelText: 'Go Back',
          nzOkText: 'Proceed',
          nzOnOk: () =>
            new Promise((resolve, reject) => {
              this.saveSVGAndProceed();
              this.modal.closeAll();
            }).catch(() => console.log('Oops errors!'))
        });
      } else {
        this.messageService.warning('If you wish to go back, you will have to redo your connections');
        this.saveSVGAndProceed();
      }
    } else {
        if(this.current === 2) {
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
