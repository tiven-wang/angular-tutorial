import { TestBed } from '@angular/core/testing';

import { ODataConfigService } from './odata-config.service';

describe('ODataConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ODataConfigService = TestBed.get(ODataConfigService);
    expect(service).toBeTruthy();
  });
});
