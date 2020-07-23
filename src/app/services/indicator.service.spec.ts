import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IndicatorService } from './indicator.service';
import { environment } from 'src/environments/environment';
import { NzMessageModule } from 'ng-zorro-antd';
import { HttpResponse } from '@angular/common/http';

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
});