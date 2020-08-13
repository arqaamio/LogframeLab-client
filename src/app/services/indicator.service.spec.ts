import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IndicatorService } from './indicator.service';
import { environment } from 'src/environments/environment';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { HttpResponse } from '@angular/common/http';
import { IndicatorResponse } from '../models/indicatorresponse.model';
import { Level } from './dto/filter.dto';

describe('IndicatorService', () => {
  let indicatorService: IndicatorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NzMessageModule
      ],
      providers: [
        IndicatorService
      ],
    });

    indicatorService = TestBed.get(IndicatorService);
    httpMock = TestBed.get(HttpTestingController);
  });

	it('should be created', () => {
    expect(indicatorService).toBeTruthy();
  });
  
	it('should send to subscribers when pressing next button', () => {
    const nextSpy = spyOn(indicatorService.getNextButtonSubject(), 'next');
    indicatorService.pressNextButton();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should send to subscribers when updating next button', () => {
    const nextSpy = spyOn(indicatorService.getNextButtonSubject(), 'next');
    indicatorService.updateNextButton(true);
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should fetch file as an Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
      const indicatorsList = [{
				id: 1, level: 'IMPACT', color: '', label: 'Name', description: '', keys: [], var: ''
      }]
      const format: string = 'docx';
      indicatorService.downloadIndicators(indicatorsList, format)
        .subscribe((response: HttpResponse<Blob>) => {
					expect(response.body).not.toBeNull;
			});
			let req = httpMock.expectOne(environment.apiBaseUrl + '/indicator/download?format=' + format);
			expect(req.request.method).toBe('POST');
			req.flush(new Blob());

      httpMock.verify();
    }));

  it('should get indicators without filters as an Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const indicatorsList: IndicatorResponse[] = [{
      id: 1, level: 'IMPACT', color: '', name: 'Name', description: '', keys: [], var: '', crsCode:null, sdgCode: null, themes:null, disaggregation: true, source:null, numTimes:0
    }]
    indicatorService.getIndicators(null)
      .subscribe((response: IndicatorResponse[]) => {
        expect(response).toBe(indicatorsList);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/indicator');
    expect(req.request.method).toBe('GET');
    req.flush(indicatorsList);

    httpMock.verify();
  }));

  it('should get indicators with filters as an Observable', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const themes = 'Agriculture';
    const level: Level = {id: 1, name:'IMPACT', color:'Red', description:'', templateVar:''};
    const indicatorsList: IndicatorResponse[] = [{
      id: 1, level: level.name, color: '', name: 'Name', description: '', keys: [], var: '', crsCode:null, sdgCode: null, themes:themes, disaggregation: true, source:null, numTimes:0
    }]
    indicatorService.getIndicators({crsCode: [], level:[level], levelIds: [level.id], sdgCode: [], source: [], themes:[themes]})
      .subscribe((response: IndicatorResponse[]) => {
        expect(response).toBe(indicatorsList);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/indicator?levels='+level.id+'&themes='+themes);
    expect(req.request.method).toBe('GET');
    req.flush(indicatorsList);

    httpMock.verify();
  }));
});