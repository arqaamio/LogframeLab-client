import { Component, OnInit, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { IndicatorService } from 'src/app/services/indicator.service';
import { Subscription } from 'rxjs/internal/Subscription';

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
  visible: boolean = false;

  constructor(
    private msg: NzMessageService,
    private indicatorService: IndicatorService
  ) {}

  ngOnInit() {
    this.nextButtonSubscription = this.indicatorService
      .getNextButtonSubject()
      .subscribe((data) => {
        if(data!=null){
          if(data.enabled!=null) this.isNext = data.enabled;
          if(data.press) this.next();
        }
      });
  }

  pre(): void {
    this.current -= 1;
  }
  next(): void {
    this.current += 1;
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
