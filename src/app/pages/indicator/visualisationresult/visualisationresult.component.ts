import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
import { IndicatorService } from 'src/app/services/indicator.service';
import { timer } from 'rxjs';
declare var draw2d: any;
declare var window: any;
declare var Toolbar: any;
@Component({
    selector: "app-visualisationresult",
    templateUrl: "./visualisationresult.component.html",
    styleUrls: ["./visualisationresult.component.scss"],
})

export class VisualisationresultComponent implements OnInit, OnDestroy {

    height: any = (window.screen.height - 400) + 'px';
    width: any = (window.screen.width - 105) + 'px';
    impact: any = [];
    isFullscreen: boolean = false;
    outcomes: any = [];
    canvasHeight: any;
    canvas: any;
    isCanvasClear: boolean = false;
    output: any = [];
    selectedChartName: any = "result";

    constructor(private indicatorService: IndicatorService) {
        this.selectedChartName = this.indicatorService.selectedChart;
        this.indicatorService.updateNextButton(true);
    }

    ngOnDestroy(): void {
        this.isCanvasClear = true;
    }

    ngOnInit(): void {
        timer(800).subscribe(() => {
            let data = this.indicatorService.dataResponse;
            this.impact = [];
            this.output = [];
            this.outcomes = [];
            // Selected data with level wise create json
            data.forEach((row) => {
                if (this.indicatorService.selectedData.hasOwnProperty(row.sort_id)) {
                    if (this.indicatorService.selectedData[row.sort_id] == true) {
                        row.indicator['sort_id'] = row.sort_id;
                        if (row.indicator.level == "IMPACT") {
                            this.impact.push(row.indicator)
                        } else if (row.indicator.level == "OUTCOME") {
                            this.outcomes.push(row.indicator)
                        } else if (row.indicator.level == "OUTPUT") {
                            this.output.push(row.indicator)
                        }
                    }
                }
            });
            if (this.indicatorService.canvasJson[this.indicatorService.selectedChart].length == 0) {
                let chartData;
                if(this.indicatorService.selectedChart == "indicator"){
                    chartData =  this.generatCanvasJson(this.impact, this.outcomes, this.output);
                } else {
                    chartData = this.getResultData();
                }
                 
                // draw chart function
                this.setFlowChart(chartData);
            } else {
                // re-draw chart function
                this.setFlowChart(this.indicatorService.canvasJson[this.indicatorService.selectedChart]);
            }
        });
    }

    // chart select change event
    changeChart(value){
        this.isCanvasClear = true;
        this.indicatorService.selectedChart = this.selectedChartName;
        let json = [];
        if(value == 'indicator'){
            json = this.generatCanvasJson(this.impact, this.outcomes, this.output);
        } else if(value == 'result'){
            json = this.getResultData();
        }
        this.canvas.clear();
        this.setFlowChart(json);
    }  

    // result data formatting
    getResultData(){
        let collapseData = this.indicatorService.collapseData;
        let collapseImpact = this.resultJsonMap(collapseData[0].data);
        let collapseOutcome = this.resultJsonMap(collapseData[1].data);
        let collapseOutput = this.resultJsonMap(collapseData[2].data);
        return this.generatCanvasJson(collapseImpact, collapseOutcome, collapseOutput);
    }

    // result data map
    resultJsonMap(collapseDataMap){
        let id = this.getUniqueId();
        return collapseDataMap.map((d, index)=> ({id: id, name:d.indicator.statement, sort_id:id + d.sort_id}));
    }

    // data convert to canvas json 
    generatCanvasJson(impact, outcomes, output){
        let impactObject = []
        let outcomesObject = [];
        let compositeWidth = 2100;
        let outputObject = [];
        let rowBoxLength = 7;
        let impactY = 20;
        let impactX = 250;
        let outComeY = 150;
        let outComeX = 250;
        let extraHeight = 0;

        let outputY = 150;
        let outputX = 250;
        if(outcomes.length == 0){
            extraHeight = 150;
        } else if(output.length == 0){
            extraHeight = 150;
        } else if(outcomes.length == 0 && output.length == 0){
            extraHeight = 300;
        }
        impactObject.push({
            "type": "draw2d.shape.composite.Jailhouse",
            "id": "354fa3b9-a834-0221-2009-abc2d6bd8a",
            "x": 130,
            "y": 0,
            "width": compositeWidth - 120,
            "height": 900,
            "userData": {},
            "cssClass": "draw2d_shape_composite_Jailhouse",
            "bgColor": "transparent",
            "color": "transparent",
            "selectable": false,
            "draggable": false,
            "stroke": 0,
            "alpha": 1,
            "radius": 0
        });
        impactObject.push({
            "type": "draw2d.shape.composite.Jailhouse",
            "id": "354fa3b9-a834-0221-2009-abc2d6bd8a16",
            "x": 0,
            "y": 0,
            "width": compositeWidth,
            "height": impact.length < rowBoxLength ? 160 : 285,
            "userData": {},
            "cssClass": "draw2d_shape_composite_Jailhouse",
            "bgColor": "#F9F9F9",
            "selectable": false,
            "draggable": false,
            "stroke": 0,
            "alpha": 1,
            "radius": 0
        });
        impact.forEach((row, index) => {
            if (index > 15) {
                return;
            }
            if (index < rowBoxLength) {
                impactY = 20;
                impactX = (250 * index);
            } else {
                impactY = 150;
                impactX = (250 * (index - rowBoxLength))
            }
            // Create text box json
            impactObject.push({
                "type": "draw2d.shape.basic.Text",
                "id": row.id,
                "x": 130 + impactX,
                "y": impactY,
                "width": 200,
                "height": 60,
                "alpha": 1,
                "selectable": true,
                "composite": "354fa3b9-a834-0221-2009-abc2d6bd8a",
                "draggable": true,
                "angle": 0,
                "userData": { sort_id: row.sort_id },
                "cssClass": "draw2d_shape_basic_Text",
                "ports": [
                    {
                        "type": "draw2d.InputPort",
                        "width": 10,
                        "height": 10,
                        "alpha": 1,
                        "selectable": false,
                        "draggable": true,
                        "angle": 0,
                        "userData": { sort_id: row.sort_id },
                        "cssClass": "draw2d_InputPort",
                        "bgColor": "rgba(204,204,204,1)",
                        "color": "rgba(204,204,204,1)",
                        "stroke": 1,
                        "dasharray": null,
                        "maxFanOut": 9007199254740991,
                        "name": "impactTop_" + row.sort_id,
                        "semanticGroup": "impact",
                        "port": "draw2d.InputPort",
                        "visible": false,
                        "locator": "draw2d.layout.locator.BottomLocator"
                    }],
                "bgColor": "rgba(68,54,90,1)",
                "color": "rgba(204,204,204,1)",
                "stroke": 2,
                "radius": 5,
                "dasharray": null,
                "text": row.name,
                "outlineStroke": 0,
                "outlineColor": "rgba(0,0,0,0)",
                "fontSize": 11,
                "fontColor": "rgba(255,255,255,1)",
                "fontFamily": "Montserrat",
            });
        });

        // Impact level label
        impactObject.push({
            "type": "draw2d.shape.basic.Label",
            "id": "66888707-0546-abed-f9d3-1408623bb39f",
            "x": 10,
            "y": 20 + impactY / 2,
            "width": 100,
            "height": 21,
            "alpha": 1,
            "selectable": false,
            "draggable": false,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "rgba(0,0,0,0)",
            "color": "rgba(27,27,27,1)",
            "stroke": 0,
            "radius": 0,
            "dasharray": null,
            "text": "Impact",
            "outlineStroke": 0,
            "outlineColor": "rgba(0,0,0,0)",
            "fontSize": 20,
            "fontColor": "rgba(8,8,8,1)",
            "fontFamily": "Montserrat",
            "fontWeight": "bold"
        });
        let outcomeHeight = 0;
        outcomeHeight = outcomes.length <= rowBoxLength ? 165 : 315;
        outcomeHeight += (output.length == 0)?30:0;
        impactObject.push({
            "type": "draw2d.shape.composite.Jailhouse",
            "id": "354fa3b9-a834-0221-2009-abc2d6bd8a12",
            "x": 0,
            "y": impactY + 125,
            "width": compositeWidth,
            "height": outcomeHeight,
            "userData": {},
            "cssClass": "draw2d_shape_composite_Jailhouse",
            "bgColor": "#F2F2F2",
            "selectable": false,
            "draggable": false,
            "stroke": 0,
            "alpha": 1,
            "radius": 0
        })
        outcomes.forEach((row, index) => {
            if (index > 15) {
                return;
            }
            if (index < rowBoxLength) {
                outComeY = 150 + impactY;
                outComeX = (250 * index);
            } else {
                outComeY = 300 + impactY;
                outComeX = (250 * (index - rowBoxLength))
            }
            // OutCome text box json
            outcomesObject.push({
                "type": "draw2d.shape.basic.Text",
                "id": row.id,
                "x": 130 + outComeX,
                "y": outComeY,
                "width": 200,
                "height": 60,
                "alpha": 1,
                "selectable": true,
                "draggable": true,
                "angle": 0,
                "composite": "354fa3b9-a834-0221-2009-abc2d6bd8a",
                "userData": { sort_id: row.sort_id },
                "cssClass": "draw2d_shape_basic_Text",
                "ports": [
                    {
                        "type": "draw2d.OutputPort",
                        "width": 10,
                        "height": 10,
                        "alpha": 1,
                        "selectable": false,
                        "draggable": true,
                        "angle": 0,
                        "userData": { sort_id: row.sort_id },
                        "cssClass": "draw2d_OutputPort",
                        "bgColor": "rgba(204,204,204,1)",
                        "color": "rgba(204,204,204,1)",
                        "stroke": 1,
                        "dasharray": null,
                        "maxFanOut": 9007199254740991,
                        "name": "outcomeTop_" + row.sort_id,
                        "semanticGroup": "impact",
                        "port": "draw2d.OutputPort",
                        "locator": "draw2d.layout.locator.TopLocator"
                    }, {
                        "type": "draw2d.InputPort",
                        "width": 10,
                        "height": 10,
                        "alpha": 1,
                        "selectable": false,
                        "draggable": true,
                        "angle": 0,
                        "userData": { sort_id: row.sort_id },
                        "cssClass": "draw2d_InputPort",
                        "bgColor": "rgba(204,204,204,1)",
                        "color": "rgba(204,204,204,1)",
                        "stroke": 1,
                        "dasharray": null,
                        "maxFanOut": 9007199254740991,
                        "name": "outcomeBottom_" + row.sort_id,
                        "semanticGroup": "outcome",
                        "port": "draw2d.InputPort",
                        "locator": "draw2d.layout.locator.BottomLocator"
                    }],
                "bgColor": "rgba(154,190,170,1)",
                "color": "rgba(204,204,204,1)",
                "stroke": 2,
                "radius": 5,
                "dasharray": null,
                "text": row.name,
                "outlineStroke": 0,
                "outlineColor": "rgba(0,0,0,0)",
                "fontSize": 11,
                "fontColor": "rgba(255,255,255,1)",
                "fontFamily": "Montserrat",
            });
        });

        // Outcome level label
        outcomesObject.push({
            "type": "draw2d.shape.basic.Label",
            "id": "66888707-0546-abed-f9d3-1408623bb39g",
            "x": 10,
            "y": 150 + impactY + ((outcomes.length < rowBoxLength) ? 37 : 75),
            "width": 100,
            "height": 21,
            "alpha": 1,
            "selectable": false,
            "draggable": false,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "rgba(0,0,0,0)",
            "color": "rgba(27,27,27,1)",
            "stroke": 0,
            "radius": 0,
            "dasharray": null,
            "text": "Outcome",
            "outlineStroke": 0,
            "outlineColor": "rgba(0,0,0,0)",
            "fontSize": 20,
            "fontColor": "rgba(8,8,8,1)",
            "fontFamily": "Montserrat",
            "fontWeight": "bold"
        })

        outcomesObject.push({
            "type": "draw2d.shape.composite.Jailhouse",
            "id": "354fa3b9-a834-0221-2009-abc2d6bd8a14",
            "x": 0,
            "y": outComeY + 140 + ((outcomes.length == 0)?20:0),
            "width": compositeWidth,
            "height": 700,
            "userData": {},
            "cssClass": "draw2d_shape_composite_Jailhouse",
            "bgColor": "#EAEAEA",
            "selectable": false,
            "draggable": false,
            "stroke": 0,
            "alpha": 1,
            "radius": 0
        });

        output.forEach((row, index) => {
            if (index > 15) {
                return;
            }
            if (index < rowBoxLength) {
                outputY = 150 + outComeY;
                outputX = (250 * index);
            } else {
                outputY = 300 + outComeY;
                outputX = (250 * (index - rowBoxLength))
            }
            // Output text box json 
            outputObject.push({
                "type": "draw2d.shape.basic.Text",
                "id": row.id,
                "x": 130 + outputX,
                "y": outputY,
                "width": 200,
                "height": 60,
                "alpha": 1,
                "selectable": true,
                "draggable": true,
                "composite": "354fa3b9-a834-0221-2009-abc2d6bd8a",
                "angle": 0,
                "userData": { sort_id: row.sort_id },
                "cssClass": "draw2d_shape_basic_Text",
                "ports": [
                    {
                        "type": "draw2d.OutputPort",
                        "width": 10,
                        "height": 10,
                        "alpha": 1,
                        "selectable": false,
                        "draggable": true,
                        "angle": 0,
                        "userData": { sort_id: row.sort_id },
                        "cssClass": "draw2d_OutputPort",
                        "bgColor": "rgba(204,204,204,1)",
                        "color": "rgba(204,204,204,1)",
                        "stroke": 1,
                        "dasharray": null,
                        "maxFanOut": 9007199254740991,
                        "name": "outputTop_" + row.sort_id,
                        "semanticGroup": "outcome",
                        "port": "draw2d.OutputPort",
                        "locator": "draw2d.layout.locator.TopLocator"
                    }],
                "bgColor": "rgba(69,52,87,1)",
                "color": "rgba(204,204,204,1)",
                "stroke": 2,
                "radius": 5,
                "dasharray": null,
                "text": row.name,
                "outlineStroke": 0,
                "outlineColor": "rgba(0,0,0,0)",
                "fontSize": 11,
                "fontColor": "rgba(255,255,255,1)",
                "fontFamily": "Montserrat",
            });
            if ((output.length - 1) != index && output.length != 1) {
                outputObject[outputObject.length - 1]['ports'].push({
                    "type": "draw2d.InputPort",
                    "width": 10,
                    "height": 10,
                    "alpha": 1,
                    "selectable": false,
                    "draggable": true,
                    "angle": 0,
                    "userData": { sort_id: row.sort_id },
                    "cssClass": "draw2d_InputPort",
                    "bgColor": "rgba(204,204,204,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "dasharray": null,
                    "maxFanOut": 9007199254740991,
                    "name": "outputRight_" + row.sort_id,
                    "semanticGroup": "output",
                    "port": "draw2d.InputPort",
                    "locator": "draw2d.layout.locator.RightLocator"
                });
            }

            if (index != 0 && output.length != 1) {
                outputObject[outputObject.length - 1]['ports'].push({
                    "type": "draw2d.OutputPort",
                    "width": 10,
                    "height": 10,
                    "alpha": 1,
                    "selectable": false,
                    "draggable": true,
                    "angle": 0,
                    "userData": { sort_id: row.sort_id },
                    "cssClass": "draw2d_OutputPort",
                    "bgColor": "rgba(204,204,204,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "dasharray": null,
                    "maxFanOut": 9007199254740991,
                    "name": "outputLeft_" + row.sort_id,
                    "semanticGroup": "output",
                    "port": "draw2d.OutputPort",
                    "locator": "draw2d.layout.locator.LeftLocator"
                });
            }
        });

        outputObject.push({
            "type": "draw2d.shape.basic.Label",
            "id": "66888707-0546-abed-f9d3-1408623bb39go",
            "x": 10,
            "y": 150 + outComeY + ((output.length < rowBoxLength) ? 30 : 75) + ((output.length == 0)?35:0),
            "width": 100,
            "height": 21,
            "alpha": 1,
            "selectable": false,
            "draggable": false,
            "angle": 0,
            "userData": {},
            "cssClass": "draw2d_shape_basic_Label",
            "ports": [],
            "bgColor": "rgba(0,0,0,0)",
            "color": "rgba(27,27,27,1)",
            "stroke": 0,
            "radius": 0,
            "dasharray": null,
            "text": "Output",
            "outlineStroke": 0,
            "outlineColor": "rgba(0,0,0,0)",
            "fontSize": 20,
            "fontColor": "rgba(8,8,8,1)",
            "fontFamily": "Montserrat",
            "fontWeight": "bold"
        });

        let height = (outputY + 150) + ((output.length == 0)?150:0);
        this.canvasHeight = height + 'px';
        let d = [...impactObject, ...outcomesObject, ...outputObject];
        return d;
    }

    // unique id
    getUniqueId() {
        let min = 200;
        let max = 1000;
        return Math.ceil(Math.random() * (max - min) + min);
    }
    
    //Code to de-select the indicator/item from the Result tab when user removes/delete any indicator box in the chart section.  
    selectindicator(id) {
        if (this.isCanvasClear == false && this.indicatorService.selectedChart == 'indicator') {
            this.indicatorService.selectedData[id] = !this.indicatorService.selectedData[id];
        }
    }

    //Code for chart's drag and drop functionality 
    setFlowChart(selected): void {
        var that = this;
        timer(2000).subscribe(() => {
            this.canvas = new draw2d.Canvas("gfx_holder");
            // this.canvas.installEditPolicy(new draw2d.policy.canvas.ExtendedKeyboardPolicy());
            var reader = new draw2d.io.json.Reader();
            reader.unmarshal(this.canvas, selected);
            this.indicatorService.loadingStart.next(false);
            Toolbar.init('toolbar', this.canvas);
            this.isCanvasClear = false;
            // export svg, png function
            this.indicatorService.exportSvg.subscribe((res) => {
                if (res == 'svgExport') {
                    var writer = new draw2d.io.svg.Writer();
                    writer.marshal(this.canvas, function (svg) {
                        let response: any = {}
                        svg = svg.replace('hidden', 'auto').replace('absolute', 'relative');
                        var writer = new draw2d.io.png.Writer();
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
                    var writer = new draw2d.io.json.Writer();
                    writer.marshal(that.canvas, function (json) {
                        if(that.isCanvasClear == false){
                            that.indicatorService.canvasJson[that.indicatorService.selectedChart] = json;
                        }
                    });
                }
            });

            // add element like text label and connection
            this.canvas.on("figure:add", function (emitter, event) {
                if (event.figure.userData !== null) {
                    if (event.figure.userData.hasOwnProperty('sort_id')) {
                        that.selectindicator(event.figure.userData.sort_id);
                    }
                }
            });

            // remove element like text label and connection
            this.canvas.on("figure:remove", function (emitter, event) {
                const button: any = document.querySelector('.delete');
                button.disabled = true
                if (event.figure.userData !== null) {
                    if (event.figure.userData.hasOwnProperty('sort_id')) {
                        that.selectindicator(event.figure.userData.sort_id);
                    }
                }
            });
        });
    }
}
