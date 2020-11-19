import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SourceService } from './source.service';
import { environment } from '../../environments/environment';

describe('SourceService', () => {
  let sourceService: SourceService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        SourceService
      ],
    });

    sourceService = TestBed.inject(SourceService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(sourceService).toBeTruthy();
  });

  it('should retrieve sources', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const expected: any[] = [{id:1, name:'UN'}, {id:2, name:'World Bank'}];
    sourceService.getSources()
      .subscribe((response:any[]) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/source');
    expect(req.request.method).toBe('GET');
    req.flush(expected);
    httpMock.verify();
  }));

  it('should create source', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const expected = {id:1, name:'UN'};
    sourceService.createSource(expected.name)
      .subscribe((response:{}) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/source');
    expect(req.request.method).toBe('POST');
    req.flush(expected);
    httpMock.verify();
  }));

  it('should update source', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const expected = {id:1, name:'UN'};
    sourceService.updateSource(expected.id, expected.name)
      .subscribe((response: any) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/source');
    expect(req.request.method).toBe('PUT');
    req.flush(expected);
    httpMock.verify();
  }));

  it('should delete source', inject([HttpTestingController], (httpClient: HttpTestingController) => {
    const expected = {id:1, name:'UN'};
    sourceService.deleteSource(expected.id)
      .subscribe((response: any) => {
        expect(response).toBe(expected);
    });
    let req = httpMock.expectOne(environment.apiBaseUrl + '/source/'+expected.id);
    expect(req.request.method).toBe('DELETE');
    req.flush(expected);
    httpMock.verify();
  }));
});