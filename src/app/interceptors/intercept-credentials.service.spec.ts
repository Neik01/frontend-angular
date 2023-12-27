import { TestBed } from '@angular/core/testing';

import { InterceptCredentialsService } from './intercept-credentials.service';

describe('InterceptCredentialsService', () => {
  let service: InterceptCredentialsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterceptCredentialsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
