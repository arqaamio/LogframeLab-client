import { Component, OnInit, OnDestroy } from "@angular/core";
import { IndicatorService } from 'src/app/services/indicator.service';

@Component({
  selector: "app-visualisationresult",
  templateUrl: "./visualisationresult.component.html",
  styleUrls: ["./visualisationresult.component.scss"],
})
export class VisualisationresultComponent implements OnInit, OnDestroy {

  constructor(private indicatorService: IndicatorService) {
    this.indicatorService.updateNextButton(true);
  }

  ngOnInit() {}
  ngOnDestroy() {}
}
