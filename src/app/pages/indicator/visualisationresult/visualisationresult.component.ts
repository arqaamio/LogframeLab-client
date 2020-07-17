import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Component({
  selector: "app-visualisationresult",
  templateUrl: "./visualisationresult.component.html",
  styleUrls: ["./visualisationresult.component.scss"],
})
export class VisualisationresultComponent implements OnInit, OnDestroy {
  indicatorSubscribtion: Subscription = null;

  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
