import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ScanResultComponent } from './scanresult.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzMessageModule, NzTableModule, NzSliderModule, NzAlertModule, NzTagModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IndicatorService } from 'src/app/services/indicator.service';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';


describe('ScanResultComponent', () => {
    let component: ScanResultComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<ScanResultComponent>;
    let indicatorService: IndicatorService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, FormsModule, HttpClientTestingModule, NzAlertModule, NzSliderModule, NzTableModule, NzTagModule, NzMessageModule],
            providers: [],
            declarations: [ScanResultComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ScanResultComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        fixture.detectChanges();
    });

    // it('should create', () => {
    //     expect(component).toBeTruthy();
    // });

    // it('should filter by indicator\'s name without sorting', (inject([HttpTestingController],
    //     (httpMock: HttpTestingController) => {
    //         const expectedResult = [
    //             {sort_id: 1, indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //             {sort_id: 3, indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //             {sort_id: 4, indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} }
    //         ];
    //         component.listOfData = [
    //             {sort_id: 1, indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''}},
    //             {sort_id: 2, indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''}},
    //             {sort_id: 3, indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''}},
    //             {sort_id: 4, indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''}},
    //             {sort_id: 5, indicator: { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''}},
    //         ];
    //         component.searchValue = 'search';
    //         component.mapOfCheckedId = { '1': true, '3': true, '4': false };
    //         component.search();

    //         expect(component.displayData).toEqual(expectedResult);
    //         expect(component.sortName).toBeNull();
    //         expect(component.sortValue).toBeNull();
    //         expect(component.impactCount).toEqual(1);
    //         expect(component.outcomeCount).toEqual(0);
    //         expect(component.outputCount).toEqual(1);
    //     })));

    // it('should filter by indicator\'s name without sorting and without selected', (inject([HttpTestingController],(httpMock: HttpTestingController) => {
    //     component.listOfData = [
    //         {sort_id: 1, indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 2, indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 3, indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 4, indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''}  },
    //         {sort_id: 5, indicator: { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //     ];
    //     const expectedResult = [component.listOfData[0], component.listOfData[2], component.listOfData[3]];
    //     component.searchValue = 'search';
    //     component.mapOfCheckedId = { '1': false, '3': false, '4': false };
    //     component.search();

    //     expect(component.displayData).toEqual(expectedResult);
    //     expect(component.sortName).toBeNull();
    //     expect(component.sortValue).toBeNull();
    //     expect(component.impactCount).toEqual(0);
    //     expect(component.outcomeCount).toEqual(0);
    //     expect(component.outputCount).toEqual(0);
    // })));

    // it('should filter by indicator\'s name without sorting and with selected', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
    //     component.listOfData = [
    //         {sort_id: 1, indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 2, indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 3, indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 4, indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //         {sort_id: 5, indicator: { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: ''} },
    //     ];
    //     const expectedResult = [component.listOfData[2], component.listOfData[3], component.listOfData[0]];
    //     component.searchValue = 'search';
    //     component.mapOfCheckedId = { '1': false, '3': true, '4': true };
    //     component.search();

    //     expect(component.displayData).toEqual(expectedResult);
    //     expect(component.sortName).toBeNull();
    //     expect(component.sortValue).toBeNull();
    //     expect(component.impactCount).toEqual(0);
    //     expect(component.outcomeCount).toEqual(1);
    //     expect(component.outputCount).toEqual(1);
    // })));

    // it('should adjust keyword frequency slider range', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
    //     const data = {dataResponse: [
    //         { id: 1, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 2, keys: [], var: '' },
    //         { id: 2, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 1, keys: [], var: '' },
    //         { id: 3, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 5, keys: [], var: '' },
    //         { id: 4, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 3, keys: [], var: '' }
    //     ]};
    //     spyOn(indicatorService, 'getIndicatorSubject').and.returnValue(new BehaviorSubject(data));

    //     component.ngOnInit();
    //     expect(component.sliderMinValue).toEqual(1);
    //     expect(component.sliderMaxValue).toEqual(5);

    //     // expect(fixture.debugElement.query(By.css('nz-slider')).nativeElement.getAttribute('ng-reflect-nz-min')).toEqual('1');
    //     // expect(element.getElementsByTagName('nz-slider').item(0).getAttribute('ng-reflect-nz-min')).toEqual('1');
    //     // expect(element.getElementsByTagName('nz-slider').item(0).getAttribute('ng-reflect-nz-max')).toEqual('5');
    // })));

    // it('should not change the slider range', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
    //     spyOn(indicatorService, 'getIndicatorSubject').and.returnValue(new BehaviorSubject({}));
    //     expect(component.sliderMinValue).toEqual(0);
    //     expect(component.sliderMaxValue).toEqual(0);
    //     expect(element.getElementsByTagName('nz-slider').item(0).getAttribute('ng-reflect-nz-min')).toEqual('0');
    //     expect(element.getElementsByTagName('nz-slider').item(0).getAttribute('ng-reflect-nz-max')).toEqual('0');
    // })));

    // it('should update the display data', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
    //     const data = [
    //         {sort_id: 1, indicator: { id: 1, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 2, keys: [], var: ''} },
    //         {sort_id: 2, indicator: { id: 2, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 1, keys: [], var: ''} },
    //         {sort_id: 3, indicator: { id: 3, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 5, keys: [], var: ''} },
    //         {sort_id: 4, indicator: { id: 4, level: '', color: '', description: '', name: '', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 3, keys: [], var: ''} }
    //     ];
    //     const expectedResult = [data[0], data[2], data[3]];
    //     component.listOfData = data;
    //     fixture.debugElement.query(By.css('nz-slider')).triggerEventHandler('nzOnAfterChange', [2,6]);
    //     expect(component.displayData).toEqual(expectedResult);
    // })));

    // afterEach(() => {
    //     fixture.destroy();
    // });
});
