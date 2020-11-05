import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndicatorService } from "src/app/services/indicator.service";
import { Subscription } from 'rxjs/internal/Subscription';


@Component({
  selector: "app-downloadresult",
  templateUrl: "./downloadresult.component.html",
  styleUrls: ["./downloadresult.component.scss"],
})
export class DownloadResultComponent implements OnInit, OnDestroy {
  dataExport: any[] = [];
  indicatorSubscription: Subscription = null;

  constructor(private indicatorService: IndicatorService) { }
  ngOnInit() {
    this.indicatorSubscription = this.indicatorService
      .getIndicatorSubject()
      .subscribe((data) => {
        if (
          data != null &&
          data.dataResponse != null &&
          data.selectedData != null
        ) {
          this.dataExport = data.selectedData.map((x)=> {
            if(x.indicator.date && x.indicator.value) {
              x.indicator.date = (<Date>x.yearSelected).getFullYear().toString();
              x.indicator.value = x.baselineValue;
            }
            x.indicator.statement = x.statement.statement;
            return x.indicator;
          });
        }
      });
  }

  /**
   * Downloads indicators in a file available in multiple formats (word, excel and dfid excel)
   * @param format Format in which the file will be downloaded in
   */
  downloadFile(format: string): void {
    this.indicatorService
      .downloadIndicators(this.dataExport, format)
      .subscribe((response) => {
        let blob = new Blob([response.body], { type: "application/octet-stream" });
        var link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = response.headers.get("filename");
        link.click();
      });
  }

  downloadSvgAndPng(type){
    let body = this.indicatorService.exportSvg.value;
    var link = document.createElement("a");
    if(type == 'svg'){
      let blob = new Blob([body[type]], { type: "application/octet-stream" });
      link.href = URL.createObjectURL(blob);
    } else {
      link.href = body[type];
    }
    link.download = 'flowchart.'+type;
    link.click();
  }

  ngOnDestroy() {
    this.indicatorSubscription.unsubscribe();
  }
}
