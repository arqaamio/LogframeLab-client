import { TestBed, ComponentFixture, inject, async } from '@angular/core/testing';
import { DownloadResultComponent } from './downloadresult.component';
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
import { IndicatorService } from 'src/app/services/indicator.service';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';


describe('DownloadResultComponent', () => {
    let component: DownloadResultComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<DownloadResultComponent>;
    let indicatorService: IndicatorService;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            imports: [BrowserAnimationsModule, CommonModule, FormsModule, HttpClientTestingModule, NzAlertModule, NzSliderModule, NzTableModule, NzTagModule, NzMessageModule],
            providers: [],
            declarations: [DownloadResultComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DownloadResultComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        indicatorService = TestBed.inject(IndicatorService);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });


    //TODO test not complete
    it('should download in the word format', async(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        component.dataExport = [
            { id: 1, level: 'IMPACT', color: '', description: '', label: 'Indicator 1', keys: [], var: '' },
            { id: 2, level: 'IMPACT', color: '', description: '', label: 'Indicator 2',  keys: [], var: '' },
            { id: 3, level: 'OUTPUT', color: '', description: '', label: 'Indicator 3',  keys: [], var: '' },
            { id: 4, level: 'OUTCOME', color: '', description: '', label: 'Indicator 4', keys: [], var: '' },
            { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', label: 'Indicator 5', keys: [], var: '' },
        ];
        expect(element.getElementsByTagName('a').length).toEqual(4);
        //const response: Observable<HttpResponse<Blob>> = Observable.create(new HttpResponse<Blob>({body: new Blob()}));
        const response: Observable<HttpResponse<Blob>> = new Observable();
        spyOn(indicatorService, 'downloadIndicators').and.returnValue(response);
        component.downloadFile('docx');
        expect(indicatorService.downloadIndicators).toHaveBeenCalledWith(component.dataExport, 'docx');
        
        // expect(element.ownerDocument.getElementsByTagName('a').length).toEqual(4);
        httpMock.verify();
    })));
});