import { TestBed, inject } from '@angular/core/testing';
// Http testing module and mocking controller
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { AccountService } from './account.service';
import { LoggerService } from '../logger.service';

describe('AccountService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [AccountService, LoggerService]
    });

    // Inject the http service and test controller for each test
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([AccountService], (service: AccountService) => {
    expect(service).toBeTruthy();
    expect(service.logger).toBeTruthy();

    service.getCaptch()
      .subscribe((image: string) => {
        expect(image).toBeTruthy();
      });

    // The following `expectOne()` will match the request's URL.
    // If no requests or multiple requests matched that URL
    // `expectOne()` would throw.
    const req = httpTestingController.expectOne('http://localhost:3000/passport/captcha/captcha-image?login_site=E&module=login&rand=sjrand');

    // Assert that the request is a GET.
    expect(req.request.method).toEqual('GET');

    // Respond with mock data, causing Observable to resolve.
    // Subscribe callback asserts that correct data was returned.
    var aFileParts = ['<a id="a"><b id="b">hey!</b></a>']; // an array consisting of a single DOMString
    var oMyBlob = new Blob(aFileParts, {type : 'application/octet-binary'}); // the blob
    req.flush(oMyBlob);
    
    // Finally, assert that there are no outstanding requests.
    httpTestingController.verify();
  }));

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });
});
