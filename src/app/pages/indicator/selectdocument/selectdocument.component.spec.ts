import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { IndicatorService } from 'src/app/services/indicator.service';
import { DONE_TITLE, SCANNING_TITLE, SelectDocumentComponent } from './selectdocument.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { of } from 'rxjs/internal/observable/of';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { RxStompService } from '@stomp/ng2-stompjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpEvent, HttpEventType, HttpProgressEvent, HttpResponse } from '@angular/common/http';
import { FilterDto } from 'src/app/services/dto/filter.dto';
import { CRSCode } from 'src/app/models/crscode.model';
import { SDGCode } from 'src/app/models/sdgcode.model';

describe('SelectDocumentComponent', () => {
    let component: SelectDocumentComponent;
    let fixture: ComponentFixture<SelectDocumentComponent>;
    let indicatorService: IndicatorService;
    let modalService: NzModalService;
    let rxStompService: RxStompService;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [SelectDocumentComponent],
            imports: [
                BrowserAnimationsModule,
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                NzGridModule,
                NzFormModule,
                NzIconModule,
                NzUploadModule,
                NzSelectModule,
                NzDropDownModule,
                NzButtonModule,
                NzModalModule,
                NzMessageModule,
                NzProgressModule
            ],
            providers: [RxStompService]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SelectDocumentComponent);
        indicatorService = TestBed.inject(IndicatorService);
        modalService = TestBed.inject(NzModalService);
        rxStompService = TestBed.inject(RxStompService);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
        expect(indicatorService).toBeTruthy();
        expect(modalService).toBeTruthy();
    });

    it('should get filters', () => {
        jasmine.clock().install();
        const filters: FilterDto = new FilterDto();
        const spyLoading = spyOn(indicatorService.loadingStart, 'next');
        const spyNextButton = spyOn(indicatorService, 'updateNextButton');
        const spyFilters = spyOn(indicatorService, 'getFilters').and.returnValue(of(filters));
        component.ngOnInit();
        jasmine.clock().tick(500);

        expect(spyLoading).toHaveBeenCalledWith(true);
        expect(spyNextButton).toHaveBeenCalledWith(true);
        expect(spyFilters).toHaveBeenCalledWith(false);
        expect(spyLoading).toHaveBeenCalledWith(false);
        jasmine.clock().uninstall();
    });

    it('should remove file', () => {
        const spyUpload = spyOn(indicatorService, 'setFileUploadList');
        component.fileList = [{uid: '', name: 'fake_file'}];
        component.removeFile();
        expect(component.fileList).toEqual([]);
        expect(spyUpload).toHaveBeenCalledWith([]);
    });

    it('should show progress on upload of document', () => {
        const response: HttpProgressEvent = {loaded: 100, type: HttpEventType.UploadProgress, total:300};
        const spyUpdateNext = spyOn(indicatorService, 'updateNextButton');
        const spySelected = spyOn(indicatorService, 'setSelectedData');
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        const spyUpload = spyOn(indicatorService, 'uploadFile').and.returnValue(of(response));
        const file = {uid: '1', name: 'fake_file_2'};
        component.uploadAndScan(file);
        expect(spyUpdateNext).toHaveBeenCalled();
        expect(spySelected).toHaveBeenCalled();
        expect(spyLoaded).toHaveBeenCalled();
        expect(spyUpload).toHaveBeenCalledWith(file);
        expect(component.progress).toBe(33);
    });

    it('should show progress on scanning of document', () => {
        const response: HttpProgressEvent = {loaded: 300, type: HttpEventType.UploadProgress, total:300};
        const spyUpdateNext = spyOn(indicatorService, 'updateNextButton');
        const spySelected = spyOn(indicatorService, 'setSelectedData');
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        const spyUpload = spyOn(indicatorService, 'uploadFile').and.returnValue(of(response));
        const file = {uid: '1', name: 'fake_file_2'};
        component.uploadAndScan(file);
        expect(spyUpdateNext).toHaveBeenCalled();
        expect(spySelected).toHaveBeenCalled();
        expect(spyLoaded).toHaveBeenCalled();
        expect(spyUpload).toHaveBeenCalledWith(file);
        expect(component.uploadStateTitle).toBe(SCANNING_TITLE);
        
        expect(component.progress > 0).toBe(true);
    });

    it('should upload and scan the file', () => {
        jasmine.clock().install();
        const response: HttpEvent<any> = new HttpResponse();
        // const spyStomp = spyOn(rxStompService, 'watch');
        const spyUpdateNext = spyOn(indicatorService, 'updateNextButton');
        const spySelected = spyOn(indicatorService, 'setSelectedData');
        const spyLoaded = spyOn(indicatorService, 'setLoadedData');
        const spyUpload = spyOn(indicatorService, 'uploadFile').and.returnValue(of(response));
        const spyNewInfo = spyOn(indicatorService, 'setIsNewInfo');
        const spyFileUpload = spyOn(indicatorService, 'setFileUploadList');
        const spyPress = spyOn(indicatorService, 'pressNextButton');
        const spyLoading = spyOn(indicatorService.loadingStart, 'next');
        
        const file = {uid: '1', name: 'fake_file_2'};
        component.uploadAndScan(file);
        jasmine.clock().tick(1000);
        // expect(spyStomp).toHaveBeenCalled();
        expect(spyUpdateNext).toHaveBeenCalled();
        expect(spySelected).toHaveBeenCalled();
        expect(spyLoaded).toHaveBeenCalled();
        expect(spyUpload).toHaveBeenCalledWith(file);
        expect(component.progress).toBe(100);
        expect(component.fileScanned).toBe(true);
        expect(component.uploadStateTitle).toBe(DONE_TITLE);
        expect(spyNewInfo).toHaveBeenCalledWith(true);
        expect(spyLoaded).toHaveBeenCalledWith(response.body);
        expect(spyFileUpload).toHaveBeenCalledWith([file]);
        expect(spyPress).toHaveBeenCalledWith(true);
        expect(spyLoading).toHaveBeenCalledWith(true);
        jasmine.clock().uninstall();
    });

    it('should change filter', () => {
        const selectedValues = new FilterDto();
        selectedValues.sector.push('Poverty');
        const spyFilter = spyOn(indicatorService, 'setFilters');
        const spyNewInfo = spyOn(indicatorService, 'setIsNewInfo');
        component.onChangeFilter('sector', ['Poverty']);
        expect(component.selectedValues).toEqual(selectedValues);
        expect(spyFilter).toHaveBeenCalledWith(selectedValues);
        expect(spyNewInfo).toHaveBeenCalledWith(true);

        selectedValues.sector.push('Advocacy');
        component.onChangeFilter('sector', ['Poverty', 'Advocacy']);
        expect(component.selectedValues).toEqual(selectedValues);
        expect(spyFilter).toHaveBeenCalledWith(selectedValues);
        expect(spyNewInfo).toHaveBeenCalledWith(true);

        const crsCode: CRSCode = {id:1, name:'CRS Code'};
        selectedValues.crsCode.push(crsCode);
        component.onChangeFilter('crsCode', [crsCode]);
        expect(component.selectedValues).toEqual(selectedValues);
        expect(spyFilter).toHaveBeenCalledWith(selectedValues);
        expect(spyNewInfo).toHaveBeenCalledWith(true);
    });

    it('should change filter', () => {
        const selectedValues = new FilterDto();
        selectedValues.sector.push('Poverty');
        const spyFilter = spyOn(indicatorService, 'setFilters');
        const spyNewInfo = spyOn(indicatorService, 'setIsNewInfo');
        component.onChangeFilter('sector', ['Poverty']);
        expect(component.selectedValues).toEqual(selectedValues);
        expect(spyFilter).toHaveBeenCalledWith(selectedValues);
        expect(spyNewInfo).toHaveBeenCalledWith(true);

        selectedValues.sector.push('Advocacy');
        component.onChangeFilter('sector', ['Poverty', 'Advocacy']);
        expect(component.selectedValues).toEqual(selectedValues);
        expect(spyFilter).toHaveBeenCalledWith(selectedValues);
        expect(spyNewInfo).toHaveBeenCalledWith(true);

        const crsCode: CRSCode = {id:1, name:'CRS Code'};
        selectedValues.crsCode.push(crsCode);
        component.onChangeFilter('crsCode', [crsCode]);
        expect(component.selectedValues).toEqual(selectedValues);
        expect(spyFilter).toHaveBeenCalledWith(selectedValues);
        expect(spyNewInfo).toHaveBeenCalledWith(true);
    });

    it('should change filter', () => {
        let selectedValues = new FilterDto();
        component.selectedValues = selectedValues;
        const result: boolean = component.isOptionSelected('sector', 'Poverty');
        expect(result).toBe(false);
        selectedValues.sector.push('Poverty');
        component.selectedValues = selectedValues;
        const result2: boolean = component.isOptionSelected('sector', 'Poverty');
        expect(result2).toBe(true);
        const result3: boolean = component.isOptionSelected('sector', 'Advocacy');
        expect(result3).toBe(false);
        
        const sdgCode: SDGCode = {id:1, name: 'SDG Code'};
        const result4: boolean = component.isOptionSelected('sdgCode', sdgCode);
        expect(result4).toBe(false);

        selectedValues.sdgCode.push({id:1, name: 'SDG Code'});
        component.selectedValues = selectedValues;
        const result5: boolean = component.isOptionSelected('sdgCode', sdgCode);
        expect(result5).toBe(true);
    });

    it('should compare filter', () => {
        const result: boolean = component.compare({id:1, name:'SDG Code'}, {id:1, name:'SDG Code'});
        expect(result).toBe(true);
        
        const result2: boolean = component.compare({id:1, name:'CRS Code'}, {id:1, name:'CRS Code 2'});
        expect(result2).toBe(true);
        
        const result3: boolean = component.compare({id:1, name:'Source'}, {id:2, name:'Source'});
        expect(result3).toBe(false);

        const result4: boolean = component.compare(null, {id:1, name:'SDG Code'});
        expect(result4).toBe(false);

        const result5: boolean = component.compare({id:1, name:'SDG Code'}, null);
        expect(result5).toBe(false);
    });
});