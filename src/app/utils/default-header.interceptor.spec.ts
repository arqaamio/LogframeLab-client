import { TestBed } from '@angular/core/testing';

import { DefaultHeaderInterceptor } from './default-header.interceptor';

describe('DefaultHeaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      DefaultHeaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: DefaultHeaderInterceptor = TestBed.inject(DefaultHeaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
