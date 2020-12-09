import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { StatisticService } from './statistic.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { environment } from '../../environments/environment';
import { SimilarityResponse } from '../models/similarityresponse.model';

describe('StatisticService', () => {
  let statisticService: StatisticService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NzMessageModule
      ],
      providers: [
        StatisticService
      ],
    });

    statisticService = TestBed.inject(StatisticService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(statisticService).toBeTruthy();
  });

  it('should retrieve statistic', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const expected: any[] = [
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

    statisticService.getStatistics()
      .subscribe((response: SimilarityResponse[]) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/statistic');
    expect(req.request.method).toBe('GET');
    req.flush(expected);
    httpMock.verify();
  }));
});