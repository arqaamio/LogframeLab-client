import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { ApproveUploadedIndicatorsComponent } from './approve-uploaded-indicators.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IndicatorService } from '../../services/indicator.service';
import { MachineLearningService } from '../../services/machinelearning.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ManageIndicatorsService } from '../../services/indicators-management/manage-indicators.service';
import { SimilarityResponse } from '../../models/similarityresponse.model';
import { IndicatorDto } from '../utils/indicator.dto';
import { IndicatorResponse } from '../../models/indicatorresponse.model';


describe('ApproveUploadedIndicators', () => {
    let component: ApproveUploadedIndicatorsComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<ApproveUploadedIndicatorsComponent>;
    let indicatorService: IndicatorService;
    let machineLearningService: MachineLearningService;
    let manageIndicatorsService: ManageIndicatorsService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, FormsModule, HttpClientTestingModule, NzAlertModule, NzSliderModule, NzTableModule, NzTagModule, NzMessageModule],
            providers: [],
            declarations: [ApproveUploadedIndicatorsComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ApproveUploadedIndicatorsComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        machineLearningService = TestBed.inject(MachineLearningService);
        manageIndicatorsService = TestBed.inject(ManageIndicatorsService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delete similar indicator and update table', inject([HttpTestingController], (httpMock: HttpTestingController) => {
        let expectedSimilarExpandSet = new Set([1,3]);
        let similarIndicators: SimilarityResponse[] = [{indicator: new IndicatorDto(), similarIndicators: [new IndicatorDto()]},
            {indicator: new IndicatorDto(), similarIndicators: [new IndicatorDto(), new IndicatorDto()]}, 
            {indicator: new IndicatorDto(), similarIndicators: [new IndicatorDto()]}];
        similarIndicators[0].indicator.id=4;
        similarIndicators[0].similarIndicators[0].id=9;
        similarIndicators[1].indicator.id=1;
        similarIndicators[1].similarIndicators[0].id=2;
        similarIndicators[1].similarIndicators[0].id=5;
        similarIndicators[2].indicator.id=3;
        similarIndicators[2].similarIndicators[0].id=7;
        let deletedSimilarityResponse: SimilarityResponse = {indicator: similarIndicators[1].indicator, similarIndicators: [similarIndicators[1].similarIndicators[1]]};
        let expectedSimilarIndicators: SimilarityResponse[] = [similarIndicators[0], deletedSimilarityResponse, similarIndicators[2]];
        component.similarExpandSet = expectedSimilarExpandSet;
        component.similarIndicators = similarIndicators;
        spyOn(manageIndicatorsService, 'deleteIndicator').and.returnValue(Observable.create());
        component.deleteIndicator(1, 2);
        expect(manageIndicatorsService.deleteIndicator).toHaveBeenCalledWith(2);
        expect(expectedSimilarExpandSet).toEqual(component.similarExpandSet);
        // expect(expectedSimilarIndicators).toEqual(component.similarIndicators);
    }));
});