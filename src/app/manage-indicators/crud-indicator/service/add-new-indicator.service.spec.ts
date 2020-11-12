import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AddNewIndicatorService, IndicatorRequestDto } from './add-new-indicator.service';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '@angular/common/http';
import { IndicatorDto } from '../../utils/indicator.dto';

describe('AddNewIndicatorService', () => {
  let addNewIndicatorService: AddNewIndicatorService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        AddNewIndicatorService
      ],
    });
    addNewIndicatorService = TestBed.inject(AddNewIndicatorService);
    httpMock = TestBed.inject(HttpTestingController);
  });
  
  it('should be created', () => {
    expect(addNewIndicatorService).toBeTruthy();
  });

  it('should create an indicator and return the Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const indicator: IndicatorDto = new IndicatorDto();
    indicator.id = 1;
    indicator.crsCode = [{id: 1, name: "CRS Code"}, {id: 2, name: "CRS Code 2"}];
    indicator.sdgCode = [{id: 1, name: "SDG Goal"}];
    indicator.source = [];
    
    const request: IndicatorRequestDto = new IndicatorRequestDto();
    request.id = 1;
    request.crsCode = [1,2];
    request.sdgCode = [1];
    request.source = []; 
    addNewIndicatorService.createIndicator(indicator)
      .subscribe((response: HttpResponse<any>) => {
        expect(response.ok).toBe(true);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/indicators');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(JSON.stringify(request));
    req.flush(indicator);
    httpMock.verify();
  }));
  
  it('should update an indicator and return the Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const indicator: IndicatorDto = new IndicatorDto();
    indicator.id = 1;
    indicator.crsCode = [{id: 1, name: "CRS Code"}, {id: 2, name: "CRS Code 2"}];
    indicator.sdgCode = [{id: 1, name: "SDG Goal"}];
    indicator.source = [];
    
    const request: IndicatorRequestDto = new IndicatorRequestDto();
    request.id = 1;
    request.crsCode = [1,2];
    request.sdgCode = [1];
    request.source = []; 
    addNewIndicatorService.updateIndicator(indicator)
      .subscribe((response: HttpResponse<any>) => {
        expect(response.ok).toBe(true);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/indicators');
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(JSON.stringify(request));
    req.flush(indicator);
    httpMock.verify();
  }));

  it('should delete an indicator and return the Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    addNewIndicatorService.deleteIndicatorById(1)
      .subscribe((response: HttpResponse<any>) => {
        expect(response.ok).toBe(true);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/indicators/1');
    expect(req.request.method).toBe('DELETE');
    httpMock.verify();
  }));
});