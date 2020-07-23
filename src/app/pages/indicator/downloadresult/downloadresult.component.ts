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
export class DownloadResultComponent implements OnInit, OnDestroy {
  dataExport: ItemData[] = [];
  indicatorSubscribtion: Subscription = null;

  constructor(private indicatorService: IndicatorService) { }
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
            (item) => data.selectedData[item.sort_id]
          );
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

  ngOnDestroy() {
    this.indicatorSubscribtion.unsubscribe();
  }
}
