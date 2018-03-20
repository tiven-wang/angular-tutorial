import { TestBed, inject } from '@angular/core/testing';

import { BetterLoggerService } from './better-logger.service';

describe('BetterLoggerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BetterLoggerService]
    });
  });

  it('should be created', inject([BetterLoggerService], (service: BetterLoggerService) => {
    expect(service).toBeTruthy();
    expect(service.logs).toBeTruthy();
  }));
});
