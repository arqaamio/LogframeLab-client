import { Component, OnInit, OnDestroy } from "@angular/core";
import { NzMessageService, UploadChangeParam } from "ng-zorro-antd";
import { IndicatorService } from "src/app/services/indicator.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-indicator",
  templateUrl: "./indicator.component.html",
  styleUrls: ["./indicator.component.scss"],
})
export class IndicatorComponent implements OnInit, OnDestroy {
  data = null;
  indicatorSubscribtion: Subscription;
  current: number = 0;
  isNext: boolean = false;

  constructor(
    private msg: NzMessageService,
    private indicatorService: IndicatorService
  ) {}
  ngOnInit() {
    this.indicatorSubscribtion = this.indicatorService
      .getIndicatorSubject()
      .subscribe((data) => {
        this.data = data;
        this.stepsValidation();
      });
  }

  /**
   * Enables or disables the next button
   */
  stepsValidation(): void {
    this.isNext = (this.current === 0 &&
      this.data != null &&
      this.data.files != null &&
      this.data.files.length > 0) ||
      
      (this.current === 1 || this.current === 4) ||
      
      (this.current === 2 &&
        this.data != null &&
        this.data.dataResponse != null
      ) ||

      (
        this.current === 3 &&
        this.data != null &&
        this.data.selectedData != null &&
        Object.keys(this.data.selectedData).length > 0
      );
  }

  pre(): void {
    this.current -= 1;
    this.stepsValidation();
  }
  next(): void {
    this.current += 1;
    this.stepsValidation();
  }
  done(): void {
    this.current = 0;
    this.indicatorService.clearIndicatorData();
  }
  ngOnDestroy() {
    this.indicatorSubscribtion.unsubscribe();
  }
}
