import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { StatisticsComponent } from './statistics.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { IndicatorService } from '../../services/indicator.service';
import { StatisticService } from '../../services/statistic.service';
import { of } from 'rxjs/internal/observable/of';
import { NumIndicatorSectorLevel } from '../../models/numindicatorsectorlevel.model';


describe('StatisticsComponent', () => {
    let component: StatisticsComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<StatisticsComponent>;
    let indicatorService: IndicatorService;
    let statisticService: StatisticService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule, CommonModule, NzTableModule, NzMessageModule ],
            providers: [],
            declarations: [StatisticsComponent],
        }).compileComponents();
        fixture = TestBed.createComponent(StatisticsComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        statisticService = TestBed.inject(StatisticService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create Indicator Service', () => {
        expect(indicatorService).toBeTruthy();
    });

    it('should create Statistic Service', () => {
        expect(statisticService).toBeTruthy();
    });

    it('should retrieve the statistic information', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        const totalNumber: number = 100;
        const sector1: string = 'Sector';
        const level: string = 'IMPACT';
        const count: number = 20;
        const countIndicators: NumIndicatorSectorLevel[] = [{sector: sector1, counter: [{level:level, count:count}]}];
        const expectedCounter: any[] = [{sector: sector1}];
        expectedCounter[0][level] = count;
        expectedCounter[0]['OUTCOME'] = 0;
        expectedCounter[0]['OUTPUT'] = 0;
        
        
        const returnedStatistics: any[] = [
        {
            date: '2020-10-01T00:00:00.000+00:00',
            downloadDFIDTemplate: 5,
            downloadPRMTemplate: 2,
            downloadWordTemplate: 44,
            downloadXLSXTemplate: 8,
        },{
            date: '2020-11-01T00:00:00.000+00:00',
            downloadDFIDTemplate: 10,
            downloadPRMTemplate: 22,
            downloadWordTemplate: 5,
            downloadXLSXTemplate: 8,
        }];

        const expectedStatisticData: any[] = 
        [{
            date: '2020-10',
            downloadDFIDTemplate: 5,
            downloadPRMTemplate: 2,
            downloadWordTemplate: 44,
            downloadXLSXTemplate: 8,
        },{
            date: '2020-11',
            downloadDFIDTemplate: 10,
            downloadPRMTemplate: 22,
            downloadWordTemplate: 5,
            downloadXLSXTemplate: 8,
        }];

        const spyNumIndicators = spyOn(indicatorService, 'getTotalNumIndicators').and.returnValue(of(totalNumber));
        const spyLevelAndSector = spyOn(indicatorService, 'getIndicatorsByLevelAndSector').and.returnValue(of(countIndicators));
        const spyStatistics = spyOn(statisticService, 'getStatistics').and.returnValue(of(returnedStatistics));

        component.ngOnInit();

        expect(spyNumIndicators).toHaveBeenCalled();
        expect(spyLevelAndSector).toHaveBeenCalled();
        expect(spyStatistics).toHaveBeenCalled();

        expect(component.numTotalIndicators).toBe(totalNumber);
        expect(component.counterSectorLevel).toEqual(expectedCounter);
        expect(component.statisticsData).toEqual(expectedStatisticData);
        
    }));
});