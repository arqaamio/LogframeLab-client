import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  Renderer2,
  HostListener,
} from "@angular/core";
import { IndicatorService } from "src/app/services/indicator.service";
import { timer } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
declare let draw2d: any;
declare let window: any;
declare let Toolbar: any;

export const MAX_NUM_BOX_ROW: number = 7;
@Component({
  selector: "app-visualization",
  templateUrl: "./visualization.component.html",
  styleUrls: ["./visualization.component.scss"],
})
export class VisualizationComponent implements OnInit, OnDestroy {
  height: string = window.screen.height - 400 + "px";
  width: string = window.screen.width - 105 + "px";
  impact: any[] = [];
  isFullscreen: boolean = false;
  outcomes: any[] = [];
  canvasHeight: any;
  canvas: any;
  isCanvasClear: boolean = false;
  output: any[] = [];

  constructor(
    private _renderer: Renderer2,
    private indicatorService: IndicatorService,
    private messageService: NzMessageService
  ) {
    this.indicatorService.updateNextButton(true);
  }

  ngOnDestroy(): void {}

  ngOnInit(): void {
    if (this.indicatorService.statementData.length > 0) {
      timer(2000).subscribe(() => {
        //if (this.indicatorService.canvasJson.length == 0) {
        let statementImpact = this.resultJsonMap(
          this.indicatorService.statementData.filter((x) => x.level == "IMPACT")
        );
        let statementOutcome = this.resultJsonMap(
          this.indicatorService.statementData.filter(
            (x) => x.level == "OUTCOME"
          )
        );
        let statementOutput = this.resultJsonMap(
          this.indicatorService.statementData.filter((x) => x.level == "OUTPUT")
        );

        let connectionsJson = [];
        if (this.indicatorService.canvasJson != null)
          connectionsJson = this.indicatorService.canvasJson.filter(
            (obj) => obj.type == "draw2d.Connection"
          );

        this.generateCanvasJson(
          statementImpact,
          statementOutcome,
          statementOutput,
          connectionsJson
        );
        // draw chart function
        this.setFlowChart();
        /*} else {
          // Set height of the canvas
          let statementOutput: any[] = this.indicatorService.statementData.filter(
            (x) => x.level == "OUTPUT"
          );
          let numOutput: number = statementOutput.length;
          let outputY: number =
            numOutput > 0
              ? this.indicatorService.canvasJson.filter(
                  (x) => x.id == statementOutput[numOutput - 1].id
                )[0].y
              : 150;
          this.canvasHeight = outputY + 150 + (numOutput == 0 ? 150 : 0) + "px";
          // re-draw chart function
          this.setFlowChart();
        }*/
      });
    } else {
      setTimeout(() => this.indicatorService.loadingStart.next(false), 1000);
      this.messageService.warning(
        "As there are no statements in the results tabs, this tab is empty and can be ignored. Please click NEXT to get to the download section"
      );
    }
  }

  // result data map
  resultJsonMap(statementData) {
    return statementData.map((d, index) => ({ id: d.id, name: d.statement }));
  }

  // data convert to canvas json
  generateCanvasJson(impact, outcomes, output, connectionsJson): void {
    let impactObject = [];
    let outcomesObject = [];
    let compositeWidth = 2100;
    let outputObject = [];
    let impactY = 20;
    let impactX = 300;
    let outcomeY = 150;
    let outcomeX = 300;

    let outputY = 150;
    let outputX = 300;

    let extraHeight = 0;
    if (outcomes.length == 0) {
      extraHeight = 150;
    } else if (output.length == 0) {
      extraHeight = 150;
    } else if (outcomes.length == 0 && output.length == 0) {
      extraHeight = 300;
    }

    let offsetOutcome = 0;
    let offsetOutput = 0;

    // Calculate the big sentence offset for outcome statements
    let maxSentenceImactsize = 0;
    for (let element of impact) {
      if (element.name && element.name.length > maxSentenceImactsize)
        maxSentenceImactsize = element.name.length;
    }
    let numberRowsImact = (maxSentenceImactsize * 6.4) / 180;
    if (numberRowsImact > 10) offsetOutcome = (numberRowsImact - 10) * 12;
    // Calculate the big sentence offset for output
    let maxSentenceOutcomesize = 0;
    for (let element of outcomes) {
      if (element.name && element.name.length > maxSentenceOutcomesize)
        maxSentenceOutcomesize = element.name.length;
    }
    // offsetOutput  = offsetOutcome + ((maxSentenceOutcomesize / 20) - 9 )* 8;
    let numberRowsOutcome = (maxSentenceOutcomesize * 6.4) / 180;
    if (numberRowsOutcome > 10)
      offsetOutput = offsetOutcome + (numberRowsOutcome - 10) * 12;
    //
    impactObject.push({
      type: "draw2d.shape.composite.Jailhouse",
      id: "354fa3b9-a834-0221-2009-abc2d6bd8a",
      x: 130,
      y: 0,
      width: compositeWidth - 120,
      height: 900,
      userData: {},
      cssClass: "draw2d_shape_composite_Jailhouse",
      bgColor: "transparent",
      color: "transparent",
      selectable: false,
      draggable: false,
      stroke: 0,
      alpha: 1,
      radius: 0,
    });
    impactObject.push({
      type: "draw2d.shape.composite.Jailhouse",
      id: "354fa3b9-a834-0221-2009-abc2d6bd8a16",
      x: 0,
      y: 0,
      width: compositeWidth,
      height: offsetOutcome + (impact.length < MAX_NUM_BOX_ROW ? 160 : 285),
      userData: {},
      cssClass: "draw2d_shape_composite_Jailhouse",
      bgColor: "#F9F9F9",
      selectable: false,
      draggable: false,
      stroke: 0,
      alpha: 1,
      radius: 0,
    });
    impact.forEach((row, index) => {
      if (index > 15) {
        return;
      }
      if (index < MAX_NUM_BOX_ROW) {
        impactY = 20;
        impactX = 250 * index;
      } else {
        impactY = 150;
        impactX = 250 * (index - MAX_NUM_BOX_ROW);
      }
      // Create text box json
      impactObject.push({
        type: "draw2d.shape.basic.Text",
        id: row.id,
        x: 130 + impactX,
        y: impactY,
        width: 200,
        height: 60,
        alpha: 1,
        selectable: true,
        composite: "354fa3b9-a834-0221-2009-abc2d6bd8a",
        draggable: true,
        angle: 0,
        userData: { id: row.id },
        cssClass: "draw2d_shape_basic_Text",
        ports: [
          {
            type: "draw2d.InputPort",
            width: 10,
            height: 10,
            alpha: 1,
            selectable: false,
            draggable: true,
            angle: 0,
            userData: { id: row.id },
            cssClass: "draw2d_InputPort",
            bgColor: "rgba(204,204,204,1)",
            color: "rgba(204,204,204,1)",
            stroke: 1,
            dasharray: null,
            maxFanOut: 9007199254740991,
            name: "impactTop_" + row.id,
            semanticGroup: "impact",
            port: "draw2d.InputPort",
            visible: false,
            locator: "draw2d.layout.locator.BottomLocator",
          },
        ],
        bgColor: "rgba(69, 52, 87, 1)",
        color: "rgba(204,204,204,1)",
        stroke: 0,
        radius: 5,
        dasharray: null,
        text: row.name,
        outlineStroke: 0,
        outlineColor: "rgba(0,0,0,0)",
        fontSize: 11,
        fontColor: "rgba(255,255,255,1)",
        fontFamily: "Montserrat, sans-serif",
      });
    });

    // Impact level label
    impactObject.push({
      type: "draw2d.shape.basic.Label",
      id: "66888707-0546-abed-f9d3-1408623bb39f",
      x: 10,
      y: 20 + impactY / 2,
      width: 100,
      height: 21,
      alpha: 1,
      selectable: false,
      draggable: false,
      angle: 0,
      userData: {},
      cssClass: "draw2d_shape_basic_Label",
      ports: [],
      bgColor: "rgba(69, 52, 87, 1)",
      color: "rgba(27,27,27,1)",
      stroke: 0,
      radius: 5,
      dasharray: null,
      text: "IMPACT",
      outlineStroke: 0,
      outlineColor: "rgba(0,0,0,0)",
      fontSize: 20,
      fontColor: "rgba(255, 255, 255, 1)",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "bold",
    });
    let outcomeHeight = 0;
    outcomeHeight = outcomes.length <= MAX_NUM_BOX_ROW ? 165 : 315;
    outcomeHeight += output.length == 0 ? 30 : 0;
    impactObject.push({
      type: "draw2d.shape.composite.Jailhouse",
      id: "354fa3b9-a834-0221-2009-abc2d6bd8a12",
      x: 0,
      y: offsetOutput + impactY + 125,
      width: compositeWidth,
      height: offsetOutput + (outcomeHeight + 1000),
      userData: {},
      cssClass: "draw2d_shape_composite_Jailhouse",
      bgColor: "#F2F2F2",
      selectable: false,
      draggable: false,
      stroke: 0,
      alpha: 1,
      radius: 0,
    });
    outcomes.forEach((row, index) => {
      if (index > 15) {
        return;
      }
      if (index < MAX_NUM_BOX_ROW) {
        outcomeY = 150 + impactY;
        outcomeX = 250 * index;
      } else {
        outcomeY = 300 + impactY;
        outcomeX = 250 * (index - MAX_NUM_BOX_ROW);
      }

      // OutCome text box json
      outcomesObject.push({
        type: "draw2d.shape.basic.Text",
        id: row.id,
        x: 130 + outcomeX,
        y: offsetOutcome + outcomeY, // y outcome addspace_impact
        width: 200,
        height: 60,
        alpha: 1,
        selectable: true,
        draggable: true,
        angle: 0,
        composite: "354fa3b9-a834-0221-2009-abc2d6bd8a",
        userData: { id: row.id },
        cssClass: "draw2d_shape_basic_Text",
        ports: [
          {
            type: "draw2d.OutputPort",
            width: 10,
            height: 10,
            alpha: 1,
            selectable: false,
            draggable: true,
            angle: 0,
            userData: { id: row.id },
            cssClass: "draw2d_OutputPort",
            bgColor: "rgba(204,204,204,1)",
            color: "rgba(204,204,204,1)",
            stroke: 1,
            dasharray: null,
            maxFanOut: 9007199254740991,
            name: "outcomeTop_" + row.id,
            semanticGroup: "impact",
            port: "draw2d.OutputPort",
            locator: "draw2d.layout.locator.TopLocator",
          },
          {
            type: "draw2d.InputPort",
            width: 10,
            height: 10,
            alpha: 1,
            selectable: false,
            draggable: true,
            angle: 0,
            userData: { id: row.id },
            cssClass: "draw2d_InputPort",
            bgColor: "rgba(204,204,204,1)",
            color: "rgba(204,204,204,1)",
            stroke: 1,
            dasharray: null,
            maxFanOut: 9007199254740991,
            name: "outcomeBottom_" + row.id,
            semanticGroup: "outcome",
            port: "draw2d.InputPort",
            locator: "draw2d.layout.locator.BottomLocator",
          },
        ],
        bgColor: "rgba(107, 60, 83, 1)",
        color: "rgba(204,204,204,1)",
        stroke: 0,
        radius: 5,
        dasharray: null,
        text: row.name,
        outlineStroke: 0,
        outlineColor: "rgba(0,0,0,0)",
        fontSize: 11,
        fontColor: "rgba(255,255,255,1)",
        fontFamily: "Montserrat, sans-serif",
      });
    });

    // Outcome level label
    outcomesObject.push({
      type: "draw2d.shape.basic.Label",
      id: "66888707-0546-abed-f9d3-1408623bb39g",
      x: 10,
      y:
        offsetOutcome +
        150 +
        impactY +
        (outcomes.length < MAX_NUM_BOX_ROW ? 37 : 75), // y outcome addspace_impact
      width: 100,
      height: 21,
      alpha: 1,
      selectable: false,
      draggable: false,
      angle: 0,
      userData: {},
      cssClass: "draw2d_shape_basic_Label",
      ports: [],
      bgColor: "rgba(107, 60, 83, 1)",
      color: "rgba(255, 255, 255, 1)",
      stroke: 0,
      radius: 5,
      dasharray: null,
      text: "OUTCOME",
      outlineStroke: 0,
      outlineColor: "rgba(0,0,0,0)",
      fontSize: 20,
      fontColor: "rgba(255, 255, 255, 1)",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "bold",
    });

    // output Jailhouse
    outcomesObject.push({
      type: "draw2d.shape.composite.Jailhouse",
      id: "354fa3b9-a834-0221-2009-abc2d6bd8a14",
      x: 0,
      y: offsetOutput + outcomeY + 140 + (outcomes.length == 0 ? 20 : 0),
      width: compositeWidth,
      height: 700,
      userData: {},
      cssClass: "draw2d_shape_composite_Jailhouse",
      bgColor: "#EAEAEA",
      selectable: false,
      draggable: false,
      stroke: 0,
      alpha: 1,
      radius: 0,
    });

    output.forEach((row, index) => {
      if (index > 15) {
        return;
      }
      if (index < MAX_NUM_BOX_ROW) {
        outputY = 150 + outcomeY;
        outputX = 250 * index;
      } else {
        outputY = 300 + outcomeY;
        outputX = 250 * (index - MAX_NUM_BOX_ROW);
      }
      // Output text box json
      outputObject.push({
        type: "draw2d.shape.basic.Text",
        id: row.id,
        x: 130 + outputX,
        y: outputY + offsetOutput, // y outcome addspace_outcome
        width: 200,
        height: 60,
        alpha: 1,
        selectable: true,
        draggable: true,
        composite: "354fa3b9-a834-0221-2009-abc2d6bd8a",
        angle: 0,
        userData: { id: row.id },
        cssClass: "draw2d_shape_basic_Text",
        ports: [
          {
            type: "draw2d.OutputPort",
            width: 10,
            height: 10,
            alpha: 1,
            selectable: false,
            draggable: true,
            angle: 0,
            userData: { id: row.id },
            cssClass: "draw2d_OutputPort",
            bgColor: "rgba(204,204,204,1)",
            color: "rgba(204,204,204,1)",
            stroke: 1,
            dasharray: null,
            maxFanOut: 9007199254740991,
            name: "outputTop_" + row.id,
            semanticGroup: "outcome",
            port: "draw2d.OutputPort",
            locator: "draw2d.layout.locator.TopLocator",
          },
        ],
        bgColor: "rgba(99, 119, 67,1)",
        color: "rgba(204,204,204,1)",
        stroke: 0,
        radius: 5,
        dasharray: null,
        text: row.name,
        outlineStroke: 0,
        outlineColor: "rgba(0,0,0,0)",
        fontSize: 11,
        fontColor: "rgba(255,255,255,1)",
        fontFamily: "Montserrat, sans-serif",
      });
    });

    outputObject.push({
      type: "draw2d.shape.basic.Label",
      id: "66888707-0546-abed-f9d3-1408623bb39go",
      x: 10,
      y:
        offsetOutput +
        150 +
        outcomeY +
        (output.length < MAX_NUM_BOX_ROW ? 30 : 75) +
        (output.length == 0 ? 35 : 0), // y outcome addspace_outcome
      width: 100,
      height: 21,
      alpha: 1,
      selectable: false,
      draggable: false,
      angle: 0,
      userData: {},
      cssClass: "draw2d_shape_basic_Label",
      ports: [],
      bgColor: "rgba(99, 119, 67,1)",
      color: "rgba(255, 255, 255, 1)",
      stroke: 0,
      radius: 5,
      dasharray: null,
      text: "OUTPUT",
      outlineStroke: 0,
      outlineColor: "rgba(0,0,0,0)",
      fontSize: 20,
      fontColor: "rgba(255, 255, 255, 1)",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "bold",
    });
    let height =
      offsetOutcome +
      offsetOutput +
      outputY +
      150 +
      (output.length == 0 ? 150 : 0);
    this.canvasHeight = height + "px";
    // load connections
    let connections = [];
    connectionsJson.forEach((row, index) => {
      connections.push(row);
    });
    this.indicatorService.canvasJson = [
      ...impactObject,
      ...outcomesObject,
      ...outputObject,
      ...connections,
    ];
  }

  //Code to de-select the indicator/item from the Result tab when user removes/delete any indicator box in the chart section.
  selectStatement(id: number) {
    // if (this.isCanvasClear == false && this.indicatorService.selectedChart == 'indicator') {
    //     this.indicatorService.selectedData[id] = !this.indicatorService.selectedData[id];
    // }
  }

  deleteStatement(id: number): void {
    this.indicatorService.statementData = this.indicatorService.statementData.filter(
      (x) => x.id != id
    );
  }

  //Code for chart's drag and drop functionality
  setFlowChart(): void {
    let that = this;
    timer(2000).subscribe(() => {
      this.canvas = new draw2d.Canvas("gfx_holder");
      // this.canvas.installEditPolicy(new draw2d.policy.canvas.ExtendedKeyboardPolicy());
      let reader = new draw2d.io.json.Reader();
      console.log(this.indicatorService.canvasJson);
      reader.unmarshal(this.canvas, this.indicatorService.canvasJson);
      this.indicatorService.loadingStart.next(false);
      Toolbar.init("toolbar", this.canvas);
      this.isCanvasClear = false;
      // export svg, png function
      this.indicatorService.exportSvg.subscribe((res) => {
        if (res == "svgExport") {
          let writer = new draw2d.io.svg.Writer();
          writer.marshal(this.canvas, function (svg) {
            let response: any = {};
            svg = svg.replace("hidden", "auto").replace("absolute", "relative");
            let writer = new draw2d.io.png.Writer();
            writer.marshal(that.canvas, function (png) {
              response = { svg, png };
              that.indicatorService.exportSvg.next(response);
            });
          });
        }
      });

      // canvas to write json
      this.canvas.getCommandStack().addEventListener(function (e) {
        if (e.isPostChangeEvent()) {
          let writer = new draw2d.io.json.Writer();
          writer.marshal(that.canvas, function (json) {
            if (that.isCanvasClear == false) {
              that.indicatorService.canvasJson = json;
            }
          });
        }
      });

      // add element like text label and connection
      this.canvas.on("figure:add", function (emitter, event) {
        if (
          event.figure.userData !== null &&
          event.figure.userData.hasOwnProperty("id")
        ) {
          that.selectStatement(event.figure.userData.id);
        }
      });

      // remove element like text label and connection
      this.canvas.on("figure:remove", function (emitter, event) {
        const button: any = document.querySelector(".delete");
        button.disabled = true;
        if (
          event.figure.userData &&
          event.figure.userData.hasOwnProperty("id")
        ) {
          that.deleteStatement(event.figure.userData.id);
        }
      });
    });
  }
  toggelFullScreen(visFrom) {
    if (visFrom.value.isFullscreen) visFrom.value.isFullscreen = false;
    else visFrom.value.isFullscreen = true;
  }
}
