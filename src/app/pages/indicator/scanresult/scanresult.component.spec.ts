import { TestBed, ComponentFixture, inject } from '@angular/core/testing';
import { ScanResultComponent } from './scanresult.component';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NzMessageModule, NzTableModule, NzSliderModule, NzAlertModule, NzTagModule } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';


describe('ScanResultComponent', () => {
    let component: ScanResultComponent;
    let element: HTMLElement;
    let fixture: ComponentFixture<ScanResultComponent>;

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
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should filter by indicator\'s name without sorting', (inject([HttpTestingController],
        (httpMock: HttpTestingController) => {
            const expectedResult = [
                { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 1 },
                { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 3 },
                { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 4 }
            ];
            component.listOfData = [
                { id: 1, level: 'IMPACT', color: '', description: '', name: 'search', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 1},
                { id: 2, level: 'IMPACT', color: '', description: '', name: 'not this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 2 },
                { id: 3, level: 'OUTPUT', color: '', description: '', name: 'Search stuff', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 3 },
                { id: 4, level: 'OUTCOME', color: '', description: '', name: 'stuff SEARCH', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 4 },
                { id: 5, level: 'OTHER_OUTCOMES', color: '', description: '', name: 'or this', themes: '', source: '', disaggregation: false, crsCode: '', sdgCode: '', numTimes: 0, keys: [], var: '', sort_id: 5 },
            ];
            component.searchValue = 'search';
            component.mapOfCheckedId = { '1': true, '3': true, '4': false };
            component.search();

            expect(component.displayData).toEqual(expectedResult);
            expect(component.sortName).toBeNull();
            expect(component.sortValue).toBeNull();
            expect(component.impactCount).toEqual(1);
            expect(component.outcomeCount).toEqual(0);
            expect(component.outputCount).toEqual(1);
        })));

    // afterEach(() => {
    //     fixture.destroy();
    // });
});