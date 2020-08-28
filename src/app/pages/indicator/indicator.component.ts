import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
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
  visible: boolean = false;

  constructor(
    private msg: NzMessageService,
    private indicatorService: IndicatorService,
    private ngxSpinnerService: NgxSpinnerService
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

  pre(): void {
    this.current -= 1;
  }

  next(): void {
    if (this.current == 2) {
      this.ngxSpinnerService.show();
      let json = this.indicatorService.canvasJson;
      let connectioned = [];
      let connection = json.filter(d => d.type === "draw2d.Connection");
      connection.forEach((data) => {
        if (this.indicatorService.allIds.indexOf(data.source.node) !== -1) {
          if (connectioned.indexOf(data.source.node) == -1) {
            connectioned.push(data.source.node);
          }
        }
        if (this.indicatorService.allIds.indexOf(data.target.node) !== -1) {
          if (connectioned.indexOf(data.target.node) == -1) {
            connectioned.push(data.target.node);
          }
        }
      });

      if (this.indicatorService.allIds.length > connectioned.length) {
        this.ngxSpinnerService.hide();
        this.msg.error("Please make sure all the logical boxes are connected before you more to the next step.")
      } else {
        this.indicatorService.exportSvg.next('svgExport');
        setTimeout(() => {
          this.ngxSpinnerService.hide();
          this.current += 1;
        }, 2000);
      }
    } else {

      if (this.current === 1) {
        this.ngxSpinnerService.show();
      }
      setTimeout(() => {
        this.current += 1;
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
