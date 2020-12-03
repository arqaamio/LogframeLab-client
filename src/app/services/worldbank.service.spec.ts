import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { WorldBankService } from './worldbank.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { environment } from '../../environments/environment';
import { SimilarityResponse } from '../models/similarityresponse.model';

describe('WorldBankService', () => {
  let worldBankService: WorldBankService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NzMessageModule
      ],
      providers: [
        WorldBankService
      ],
    });

    worldBankService = TestBed.inject(WorldBankService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(worldBankService).toBeTruthy();
  });

  it('should retrieve world bank countries', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const expected: Map<string, string> = new Map<string, string>();
    expected.set('NZL', 'New Zealand');
    expected.set('FJI', 'Fiji');
    expected.set('PNG', 'Papua New Guinea');
    worldBankService.getWorldBankCountries()
      .subscribe((response: Map<string, string>) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/worldbank/country');
    expect(req.request.method).toBe('GET');
    req.flush(expected);
    httpMock.verify();
  }));

  it('should retrieve world bank baseline value', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const indicatorId: number = 90;
    const countryCode: string = 'AUT';
    const expected: any[] = [{'indicator':null,'country':null,'countryiso3code':null,'date':'2003','value':1,'unit':null,'obs_status':null,'decimal':null},{'indicator':null,'country':null,'countryiso3code':null,'date':'2005','value':1,'unit':null,'obs_status':null,'decimal':null}];
    worldBankService.getWorldBankBaselineValue(indicatorId, countryCode)
      .subscribe((response: any[]) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/worldbank/values?countryId='+countryCode+'&indicatorId='+indicatorId);
    expect(req.request.method).toBe('GET');
    req.flush(expected);
    httpMock.verify();
  }));

  it('should retrieve world bank baseline value with date', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const indicatorId: number = 90;
    const countryCode: string = 'AUT';
    const year: number = 2003;
    const expected: any[] = [{'indicator':null,'country':null,'countryiso3code':null,'date':'2003','value':1,'unit':null,'obs_status':null,'decimal':null}];
    worldBankService.getWorldBankBaselineValue(indicatorId, countryCode, year)
      .subscribe((response: any[]) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/worldbank/values?countryId='+countryCode+'&indicatorId='+indicatorId+'&years='+year);
    expect(req.request.method).toBe('GET');
    req.flush(expected);
    httpMock.verify();
  }));
});