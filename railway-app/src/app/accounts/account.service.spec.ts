import { TestBed, inject } from '@angular/core/testing';

import { AccountService } from './account.service';
import { LoggerService } from '../logger.service';

describe('AccountService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AccountService, LoggerService]
    });
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
    expect(service.logger).toBeTruthy();
  }));
});
