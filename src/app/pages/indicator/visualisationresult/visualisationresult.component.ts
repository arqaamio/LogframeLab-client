import { Component, OnInit, OnDestroy, Output, TemplateRef, EventEmitter } from "@angular/core";
import { IndicatorService } from 'src/app/services/indicator.service';
import { NzRowDirective } from 'ng-zorro-antd';
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
    loading: boolean = true;
    height: any = (window.screen.height - 400) + 'px';
    width: any = (window.screen.width - 105) + 'px';
    impact: any = [];
    isFullscreen: boolean = false;
    outcomes: any = [];
    canvas: any;
    isCanvasClear: boolean = false;
    @Output() loadingStart = new EventEmitter<any>();
    output: any = [];
    constructor(private indicatorService: IndicatorService) {
        this.loadingStart.emit(true);
        this.indicatorService.updateNextButton(true);
    }

    ngOnDestroy(): void {
        this.isCanvasClear = true;
    }

    ngOnInit(): void {
        timer(800).subscribe(() => {
            let data = this.indicatorService.dataResponse;
            if (this.indicatorService.canvasJson.length == 0) {
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
               
                let impactObject = []
                let outcomesObject = [];
                let outputObject = [];
                let impactY = 20;
                let impactX = 250;
                let outComeY = 150;
                let outComeX = 250;

                let outputY = 150;
                let outputX = 250;
                this.impact.forEach((row, index) => {
                    if (index > 15) {
                        return;
                    }
                    if (index < 8) {
                        impactY = 20;
                        impactX = (250 * index);
                    } else {
                        impactY = 150;
                        impactX = (250 * (index - 8))
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

                this.outcomes.forEach((row, index) => {
                    if (index > 15) {
                        return;
                    }
                    if (index < 8) {
                        outComeY = 150 + impactY;
                        outComeX = (250 * index);
                    } else {
                        outComeY = 300 + impactY;
                        outComeX = (250 * (index - 8))
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
                                "cssClass": "draw2d_HybridPort",
                                "bgColor": "rgba(204,204,204,1)",
                                "color": "rgba(204,204,204,1)",
                                "stroke": 1,
                                "dasharray": null,
                                "maxFanOut": 9007199254740991,
                                "name": "outcomeTop_" + row.sort_id,
                                "semanticGroup": "impact",
                                "port": "draw2d.HybridPort",
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
                    "y": 150 + impactY + ((this.outcomes.length < 8) ? 37 : 75),
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

                this.output.forEach((row, index) => {
                    if (index > 15) {
                        return;
                    }
                    if (index < 8) {
                        outputY = 150 + outComeY;
                        outputX = (250 * index);
                    } else {
                        outputY = 300 + outComeY;
                        outputX = (250 * (index - 8))
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
                                "cssClass": "draw2d_HybridPort",
                                "bgColor": "rgba(204,204,204,1)",
                                "color": "rgba(204,204,204,1)",
                                "stroke": 1,
                                "dasharray": null,
                                "maxFanOut": 9007199254740991,
                                "name": "outputTop_" + row.sort_id,
                                "semanticGroup": "outcome",
                                "port": "draw2d.HybridPort",
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
                    if ((this.output.length - 1) != index && this.output.length != 1) {
                        outputObject[outputObject.length - 1]['ports'].push({
                            "type": "draw2d.HybridPort",
                            "width": 10,
                            "height": 10,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 0,
                            "userData": { sort_id: row.sort_id },
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "outputRight_" + row.sort_id,
                            "semanticGroup": "output",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.RightLocator"
                        });
                    }

                    if (index != 0 && this.output.length != 1) {
                        outputObject[outputObject.length - 1]['ports'].push({
                            "type": "draw2d.HybridPort",
                            "width": 10,
                            "height": 10,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 0,
                            "userData": { sort_id: row.sort_id },
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "outputLeft_" + row.sort_id,
                            "semanticGroup": "output",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.LeftLocator"
                        });
                    }
                });
                outputObject.push({
                    "type": "draw2d.shape.basic.Label",
                    "id": "66888707-0546-abed-f9d3-1408623bb39go",
                    "x": 10,
                    "y": 150 + outComeY + ((this.output.length < 8) ? 30 : 75),
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
                })
                let d = [...impactObject, ...outcomesObject, ...outputObject];
                // draw chart function
                this.setFlowChart(d);
            } else {
                // re-draw chart function
                this.setFlowChart(this.indicatorService.canvasJson);
            }
        });
    }

    selectindicator(id) {
        if (this.isCanvasClear == false) {
            this.indicatorService.selectedData[id] = !this.indicatorService.selectedData[id];
        }
    }

    setFlowChart(selected): void {
        var that = this;
        timer(2000).subscribe(() => {
            this.canvas = new draw2d.Canvas("gfx_holder");
            this.canvas.installEditPolicy(new draw2d.policy.canvas.ExtendedKeyboardPolicy());
            var reader = new draw2d.io.json.Reader();
            reader.unmarshal(this.canvas, selected);
            this.loadingStart.emit(false);
            Toolbar.init('toolbar', this.canvas);
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
                        that.indicatorService.canvasJson = json;
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
                if (event.figure.userData !== null) {
                    if (event.figure.userData.hasOwnProperty('sort_id')) {
                        that.selectindicator(event.figure.userData.sort_id);
                    }
                }
            });
        });
    }
}
