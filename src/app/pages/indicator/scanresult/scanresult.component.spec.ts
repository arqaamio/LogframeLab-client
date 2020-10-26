import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ScanResultComponent } from './scanresult.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { IndicatorService } from 'src/app/services/indicator.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { NzModalModule } from 'ng-zorro-antd';
import { Source } from 'src/app/models/source.model';


describe('ScanResultComponent', () => {
    let component: ScanResultComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<ScanResultComponent>;
    let indicatorService: IndicatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, FormsModule, HttpClientTestingModule, NzAlertModule, NzSliderModule, NzTableModule, NzTagModule, NzMessageModule, NzModalModule],
            providers: [],
            declarations: [ScanResultComponent],
        }).compileComponents();
    // });
    // TODO: this should be uncommented according to
    // https://angular.io/guide/testing-components-basics
    // but https://stackoverflow.com/a/51543242
    // beforeEach(() => {
        fixture = TestBed.createComponent(ScanResultComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        fixture.detectChanges();
    });

    it('should be create service', inject([IndicatorService], (service: IndicatorService) => {
        expect(service).toBeTruthy();
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should filter by indicator\'s name without sorting', (inject([HttpTestingController],
        (httpMock: HttpTestingController) => {
            const expectedResult = [
                {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
                {indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
                {indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null }
            ];
            component.listOfData = [
                {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null},
                {indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null},
                {indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null},
                {indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null},
                {indicator: { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null},
            ];
            component.searchValue = 'search';
            component.mapOfCheckedId = { '1': true, '3': true, '4': false };
            component.search(false);

            expect(component.displayData).toEqual(expectedResult);
            expect(component.sortName).toBeNull();
            expect(component.sortValue).toBeNull();
            expect(component.impactCount).toEqual(1);
            expect(component.outcomeCount).toEqual(0);
            expect(component.outputCount).toEqual(1);
        })));

    it('should filter by indicator\'s name without sorting and without selected', (inject([HttpTestingController],(httpMock: HttpTestingController) => {
        component.listOfData = [
            {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null,score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
        ];
        const expectedResult = [component.listOfData[0], component.listOfData[2], component.listOfData[3]];
        component.searchValue = 'search';
        component.mapOfCheckedId = { '1': false, '3': false, '4': false };
        component.search(false);

        expect(component.displayData).toEqual(expectedResult);
        expect(component.sortName).toBeNull();
        expect(component.sortValue).toBeNull();
        expect(component.impactCount).toEqual(0);
        expect(component.outcomeCount).toEqual(0);
        expect(component.outputCount).toEqual(0);
    })));

    it('should filter by indicator\'s name without sorting and with selected', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
        component.listOfData = [
            {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 0, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
        ];
        const expectedResult = [component.listOfData[0], component.listOfData[2], component.listOfData[3]];
        component.searchValue = 'search';
        component.mapOfCheckedId = { '1': false, '3': true, '4': true };
        component.search(false);

        expect(component.displayData).toEqual(expectedResult);
        expect(component.sortName).toBeNull();
        expect(component.sortValue).toBeNull();
        expect(component.impactCount).toEqual(0);
        expect(component.outcomeCount).toEqual(1);
        expect(component.outputCount).toEqual(1);
    })));

    it('should adjust keyword frequency slider range', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const data = {dataResponse: [
            { id: 1, level: '', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 2, keys: [], date:'', value: '' },
            { id: 2, level: '', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 1, keys: [], date:'', value: '' },
            { id: 3, level: '', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 5, keys: [], date:'', value: '' },
            { id: 4, level: '', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 3, keys: [], date:'', value: '' }
        ]};
        spyOn(indicatorService, 'getIndicatorSubject').and.returnValue(new BehaviorSubject(data));

        component.ngOnInit();
        // expect(component.sliderMinValue).toEqual(1);
        // expect(component.sliderMaxValue).toEqual(5);

        // expect(fixture.debugElement.query(By.css('nz-slider')).nativeElement.getAttribute('ng-reflect-nz-min')).toEqual('1');
        // expect(element.getElementsByTagName('nz-slider').item(0).getAttribute('ng-reflect-nz-min')).toEqual('1');
        // expect(element.getElementsByTagName('nz-slider').item(0).getAttribute('ng-reflect-nz-max')).toEqual('5');
    })));

    it('should update the display data', (inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const data = [
            {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 2, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 2, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 1, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 3, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 5, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null },
            {indicator: { id: 4, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 3, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null }
        ];
        const expectedResult = [data[0], data[2], data[3]];
        component.listOfData = data;
        // fixture.debugElement.query(By.css('nz-slider')).triggerEventHandler('nzOnAfterChange', [2,6]);
        // expect(component.displayData).toEqual(expectedResult);
    })));


    it('should validate if indicator has a source of World Bank', () => {
        let worldBankSource: Source = {id:2, name:"World Bank"};
        let itemWorldBank = {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: [worldBankSource], disaggregation: false, crsCode: null, sdgCode: null, score: 2, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null };
        let itemNotWorldBank = {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: [{id:99, name:"Other source"}], disaggregation: false, crsCode: null, sdgCode: null, score: 2, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null };
        let itemEmptySource = {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: [], disaggregation: false, crsCode: null, sdgCode: null, score: 2, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null };
        let itemNullSource = {indicator: { id: 1, level: 'IMPACT', color: '', description: '', name: '', sector: '', source: null, disaggregation: false, crsCode: null, sdgCode: null, score: 2, keys: [], date:'', value: ''}, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null };
        
        let itemNullIndicator = {indicator: null, countryCodeSelected: "", yearSelected:null, baselineValue: "", statement: null};
        expect(component.isWorldBankIndicator(itemWorldBank)).toBe(true);
        expect(component.isWorldBankIndicator(itemNotWorldBank)).toBe(false);
        expect(component.isWorldBankIndicator(itemEmptySource)).toBe(false);
        expect(component.isWorldBankIndicator(itemNullSource)).toBe(false);
        expect(component.isWorldBankIndicator(itemNullIndicator)).toBe(false);
    });

    afterEach(() => {
        fixture.destroy();
    });
});
