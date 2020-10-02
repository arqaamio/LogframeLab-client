

import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MachineLearningService } from './machinelearning.service';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { environment } from '../../environments/environment';
import { SimilarityResponse } from '../models/similarityresponse.model';

describe('MMachineLearningServicea', () => {
  let machineLearningService: MachineLearningService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        NzMessageModule
      ],
      providers: [
        MachineLearningService
      ],
    });

    machineLearningService = TestBed.get(MachineLearningService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(machineLearningService).toBeTruthy();
  });

  it('should retrieve similar indicators', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const simResponse: SimilarityResponse[] = [new SimilarityResponse()];
    const threshold: number = 0.8;
    machineLearningService.getSimilarIndicators(threshold)
      .subscribe((response: SimilarityResponse[]) => {
        expect(response).toBe(simResponse);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/ml/similarity?threshold='+threshold);
    expect(req.request.method).toBe('GET');
    req.flush(simResponse);
    httpMock.verify();
  }));
});