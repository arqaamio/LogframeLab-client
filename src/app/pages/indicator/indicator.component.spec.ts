import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { RxStompService } from '@stomp/ng2-stompjs';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { routes } from 'src/app/app.module';
import { IndicatorService } from 'src/app/services/indicator.service';
import { DownloadResultModule } from './downloadresult/downloadresult.module';
import { IndicatorComponent } from "./indicator.component";
import { ResultModule } from './result/result.module';
import { ScanResultModule } from './scanresult/scanresult.module';
import { SelectDocumentModule } from './selectdocument/selectdocument.module';
import { VisualizationModule } from './visualization/visualization.module';

describe('SourcesComponent', () => {
    let component: IndicatorComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<IndicatorComponent>;
    let indicatorService: IndicatorService;
    let messageService: NzMessageService;
    let modalService: NzModalService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, HttpClientTestingModule, RouterTestingModule.withRoutes(routes),
                CommonModule,
                NzButtonModule,
                NzIconModule,
                NzPopoverModule,
                NzStepsModule,
                NzSpinModule,
                SelectDocumentModule,
                ResultModule,
                ScanResultModule,
                NzMessageModule,
                VisualizationModule,
                DownloadResultModule
            ],
            providers: [RxStompService],
            declarations: [IndicatorComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(IndicatorComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        messageService = TestBed.inject(NzMessageService);
        modalService = TestBed.inject(NzModalService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(indicatorService).toBeTruthy();
        expect(messageService).toBeTruthy();
        expect(modalService).toBeTruthy();
    });

    it('should go back a step from step 1', () => {
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        component.current = 1;
        component.pre();
        expect(component.current).toBe(0);
        expect(indicatorService.currentStep).toBe(0);
        expect(spyLoaded).toHaveBeenCalledWith(null);
        expect(indicatorService.statementData).toEqual([]);
        expect(component.isSpinning).toBe(false);
    });

    it('should go back a step from step 2', () => {
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        component.current = 2;
        component.pre();
        expect(component.current).toBe(1);
        expect(indicatorService.currentStep).toBe(1);
        expect(spyLoaded).not.toHaveBeenCalled();
        expect(component.isSpinning).toBe(false);
    });

    it('should go back a step from step 3', () => {
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        component.current = 3;
        component.pre();
        expect(component.current).toBe(2);
        expect(indicatorService.currentStep).toBe(2);
        expect(spyLoaded).not.toHaveBeenCalled();
        expect(indicatorService.canvasJson).toEqual([]);
        expect(component.isSpinning).toBe(true);
    });

    it('should go back a step from step 4', () => {
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        component.current = 4;
        component.pre();
        expect(component.current).toBe(3);
        expect(indicatorService.currentStep).toBe(3);
        expect(spyLoaded).not.toHaveBeenCalled();
        expect(component.isSpinning).toBe(true);
    });

    it('should call to say button was pressed from step 1', () => {
        // const spyNext = spyOn(indicatorService.getNextButtonSubject(), 'next');
        component.current = 0;
        component.next();
        expect(component.current).toBe(0);
        expect(indicatorService.currentStep).toBe(0);
        // expect(spyNext).not.toHaveBeenCalled();
        expect(component.isSpinning).toBe(false);
    });

    it('should advance a step from step 1', () => {
        validateNextStep(0, false);
    });

    it('should restart the workflow', () => {
        const spyLoaded = spyOn(indicatorService, 'clearIndicatorData');
        component.current = 4;
        component.done();
        expect(component.current).toBe(0);
        expect(spyLoaded).toHaveBeenCalled();
    });

    it('should close popover', () => {
        component.visible = true;
        component.clickClose();
        expect(component.visible).toBe(false);
    });

    it('should save SVG and PNG of visualisation', () => {
        jasmine.clock().install();
        const spyExport = spyOn(indicatorService.exportSvg, 'next');
        component.isSpinning = true;
        component.current = 0;
        component.saveSVGAndProceed();
        jasmine.clock().tick(2000);
        expect(spyExport).toHaveBeenCalled();
        expect(component.current).toBe(1);
        expect(component.isSpinning).toBe(false);
        expect(indicatorService.currentStep).toBe(1);
        jasmine.clock().uninstall();
    });

    function validateNextStep(step: number, spinning: boolean): void {
        jasmine.clock().install();
        component.current = step;
        component.next(true);
        jasmine.clock().tick(500);
        expect(component.current).toBe(step+1);
        expect(indicatorService.currentStep).toBe(step+1);
        expect(component.isSpinning).toBe(spinning);
        jasmine.clock().uninstall();
    }
});