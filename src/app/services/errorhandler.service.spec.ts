import { TestBed, async, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ErrorHandlerService } from './errorhandler.service';
import { NzMessageModule, NzMessageService } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ClientError } from '../models/clienterror.model';
import { APIError } from '../models/apierror.model';

describe('ErrorHandlerService', () => {
  let errorHandlerService: ErrorHandlerService;

  beforeEach( async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserAnimationsModule, HttpClientTestingModule,  NzMessageModule],
      providers: [ErrorHandlerService]
    })
    .compileComponents();

  }));
  beforeEach(() => {
    errorHandlerService = TestBed.inject(ErrorHandlerService);
  });

  it('should log the error', () => {
    const spy = spyOn(console, 'error');
    const error: Error = new Error('Fake Error');
    errorHandlerService.handleError(error);
    expect(spy).toHaveBeenCalledWith(error);
  });

  it('should log the error and show message', inject([NzMessageService], (msgService: NzMessageService) => {
    const spy = spyOn(console, 'error');
    const spyLog = spyOn(console, 'log');
    const spyMessage = spyOn(msgService, 'create');
    const apiError: APIError = new APIError();
    const error: ClientError = new ClientError();
    error.message = 'Fake Error';
    error.object = apiError;
    errorHandlerService.handleError(error);
    expect(spy).toHaveBeenCalledWith(error);
    expect(spyLog).toHaveBeenCalledWith(apiError);
    expect(spyMessage).toHaveBeenCalledWith('error', 'Fake Error');
  }));
});