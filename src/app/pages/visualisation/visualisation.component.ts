import { Component, OnInit, AfterViewInit } from '@angular/core';
declare var draw2d: any;
declare var $: any;
declare var window: any;
@Component({
    selector: 'app-visualisation',
    templateUrl: './visualisation.component.html',
    styleUrls: ['./visualisation.component.scss']
})
export class VisualisationComponent implements OnInit, AfterViewInit {
    height: any = (window.screen.height - 350) + 'px';
    width: any = (window.screen.width - 105) + 'px';
    constructor() { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        document.addEventListener("DOMContentLoaded", function () {
            setTimeout(() => {
                var canvas = new draw2d.Canvas("gfx_holder");
                var dataText = [{
                    "type": "draw2d.shape.basic.Text",
                    "id": "354fa3b9-a834-0221-2009-abc2d6bd852as",
                    "x": window.screen.width / 2,
                    "y": 20,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [
                        {
                            "type": "draw2d.InputPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 0,
                            "userData": {},
                            "cssClass": "draw2d_InputPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid0",
                            "semanticGroup": "global",
                            "port": "draw2d.InputPort",
                            "locator": "draw2d.layout.locator.BottomLocator"
                        }],
                    "bgColor": "rgba(68,54,90,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 2,
                    "radius": 5,
                    "dasharray": null,
                    "text": "Energy imports, net (% of energy use)",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(255,255,255,1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }, {
                    "type": "draw2d.shape.basic.Text",
                    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e",
                    "x": window.screen.width / 2,
                    "y": 120,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [
                        {
                            "type": "draw2d.HybridPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid0",
                            "semanticGroup": "global",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.TopLocator",

                        }, {
                            "type": "draw2d.InputPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_InputPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid12",
                            "semanticGroup": "global1",
                            "port": "draw2d.InputPort",
                            "locator": "draw2d.layout.locator.LeftLocator",

                        }, {
                            "type": "draw2d.InputPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_InputPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid12",
                            "semanticGroup": "global1",
                            "port": "draw2d.InputPort",
                            "locator": "draw2d.layout.locator.RightLocator",

                        }, {
                            "type": "draw2d.InputPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_InputPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid12",
                            "semanticGroup": "global1",
                            "port": "draw2d.InputPort",
                            "locator": "draw2d.layout.locator.BottomLocator",
                        }],
                    "bgColor": "rgba(154,190,170,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 2,
                    "radius": 5,
                    "dasharray": null,
                    "text": "Reduced smoking",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(8,8,8,1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }, {
                    "type": "draw2d.shape.basic.Text",
                    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_1",
                    "x": window.screen.width / 2,
                    "y": 200,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [{
                        "type": "draw2d.HybridPort",
                        "width": 5,
                        "height": 5,
                        "alpha": 1,
                        "selectable": false,
                        "draggable": true,
                        "angle": 270,
                        "userData": {},
                        "cssClass": "draw2d_HybridPort",
                        "bgColor": "rgba(204,204,204,1)",
                        "color": "rgba(204,204,204,1)",
                        "stroke": 1,
                        "dasharray": null,
                        "maxFanOut": 9007199254740991,
                        "name": "hybrid1",
                        "semanticGroup": "global1",
                        "port": "draw2d.HybridPort",
                        "locator": "draw2d.layout.locator.TopLocator"
                    }],
                    "bgColor": "rgba(69,52,87,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "radius": 5,
                    "dasharray": null,
                    "text": "More knowledge about the hazards of smoking",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(255,255,255,1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }, {
                    "type": "draw2d.shape.basic.Text",
                    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_1",
                    "x": window.screen.width / 2 - 300,
                    "y": 200,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [
                        {
                            "type": "draw2d.HybridPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid1",
                            "semanticGroup": "global1",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.RightLocator"
                        }],
                        "bgColor": "rgba(69,52,87,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "radius": 5,
                    "dasharray": null,
                    "text": "National laws restricting smoking",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(255,255,255,1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }, {
                    "type": "draw2d.shape.basic.Text",
                    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_1",
                    "x": window.screen.width / 2 - 150,
                    "y": 200,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [
                        {
                            "type": "draw2d.HybridPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid1",
                            "semanticGroup": "global1",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.RightLocator"
                        }],
                    "bgColor": "rgba(69,52,87,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "radius": 5,
                    "dasharray": null,
                    "text": "Changed attitudes towards smoking",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(255, 255, 255, 1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }, {
                    "type": "draw2d.shape.basic.Text",
                    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_1",
                    "x": window.screen.width / 2 + 150,
                    "y": 200,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [
                        {
                            "type": "draw2d.HybridPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid1",
                            "semanticGroup": "global1",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.LeftLocator"
                        }],
                        "bgColor": "rgba(69,52,87,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "radius": 5,
                    "dasharray": null,
                    "text": "Local activists working on smoking issues",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(255,255,255,1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }, {
                    "type": "draw2d.shape.basic.Text",
                    "id": "ebfb35bb-5767-8155-c804-14bda7759dc2e_1",
                    "x": window.screen.width / 2 + 300,
                    "y": 200,
                    "width": 100,
                    "height": 60,
                    "alpha": 1,
                    "selectable": true,
                    "draggable": true,
                    "angle": 0,
                    "userData": {},
                    "cssClass": "draw2d_shape_basic_Text",
                    "ports": [
                        {
                            "type": "draw2d.HybridPort",
                            "width": 5,
                            "height": 5,
                            "alpha": 1,
                            "selectable": false,
                            "draggable": true,
                            "angle": 270,
                            "userData": {},
                            "cssClass": "draw2d_HybridPort",
                            "bgColor": "rgba(204,204,204,1)",
                            "color": "rgba(204,204,204,1)",
                            "stroke": 1,
                            "dasharray": null,
                            "maxFanOut": 9007199254740991,
                            "name": "hybrid1",
                            "semanticGroup": "global1",
                            "port": "draw2d.HybridPort",
                            "locator": "draw2d.layout.locator.LeftLocator",

                        }],
                        "bgColor": "rgba(69,52,87,1)",
                    "color": "rgba(204,204,204,1)",
                    "stroke": 1,
                    "radius": 5,
                    "dasharray": null,
                    "text": "Local laws restricting smoking",
                    "outlineStroke": 0,
                    "outlineColor": "rgba(0,0,0,0)",
                    "fontSize": 10,
                    "fontColor": "rgba(255,255,255,1)",
                    "fontFamily": "Verdana, Geneva, sans-serif"
                }]

                var createConnection = function () {
                    // return my special kind of connection
                    var con = new draw2d.Connection({
                        radius: 14,
                        color: "rgba(204,204,204,1)",
                        router: new draw2d.layout.connection.InteractiveManhattanConnectionRouter()
                    });
                    con.setTargetDecorator(new draw2d.decoration.connection.ArrowDecorator(10, 10));
                    return con;
                };

                // install a custom connection create policy
                canvas.installEditPolicy(new draw2d.policy.connection.DragConnectionCreatePolicy({
                    createConnection: createConnection
                }));


                var reader = new draw2d.io.json.Reader();
                reader.unmarshal(canvas, dataText);
                canvas.getCommandStack().addEventListener(function (e) {
                    if (e.isPostChangeEvent()) {
                        displayJSON(canvas);
                    }
                });

                function displayJSON(canvas) {
                    var writer = new draw2d.io.json.Writer();
                    writer.marshal(canvas, function (json) {
                        // console.log(JSON.stringify(json, null, 2));
                    });
                }
            });
        });
    }

}
