import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndicatorService } from "src/app/services/indicator.service";
import { Subscription } from "rxjs";

interface ItemData {
  id: number;
  level: string;
  color: string;
  label: string;
  description: string;
  keys: Array<string>;
  var: string;
}

@Component({
  selector: "app-downloadresult",
  templateUrl: "./downloadresult.component.html",
  styleUrls: ["./downloadresult.component.scss"],
})
export class DownloadresultComponent implements OnInit, OnDestroy {
  dataExport: ItemData[] = [];
  indicatorSubscribtion: Subscription = null;

  constructor(private indicatorService: IndicatorService) {}
  ngOnInit() {
    this.indicatorSubscribtion = this.indicatorService
      .getIndicatorSubject()
      .subscribe((data) => {
        if (
          data != null &&
          data.dataResponse != null &&
          data.selectedData != null
        ) {
          this.dataExport = data.dataResponse.filter(
            (item) => data.selectedData[item.id]
          );
        }
      });
  }
  ngOnDestroy() {
    this.indicatorSubscribtion.unsubscribe();
  }
  downloadFile(format: string) {
    this.indicatorService
      .downloadInidicators(this.dataExport, format)
      .subscribe((response) =>
        this.downLoadFile(response, "application/octet-stream", format)
      );
  }
  //
  downLoadFile(response: any, type: string, format: string) {
    let blob = new Blob([response.body], { type: type });
    var link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = response.headers.get("filename");
    link.click();
  }
}
