import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ODataConfiguration, ODataServiceFactory, IODataResponseModel } from "angular-odata-es5";
import { environment } from '../../environments/environment';

interface MyIODataResponseModel<T> extends IODataResponseModel<T> {
  d: MyIODataResults<T>;
}

interface MyIODataResults<T> {
  results: T[];
}

@Injectable()
export class MyODataConfig extends ODataConfiguration {
  baseUrl=environment.oDataBaseUrl+"/sap/opu/odata/sap/SEPMRA_SO_ANA/"
  
  extractQueryResultData<T>(res: HttpResponse<MyIODataResponseModel<T>>): T[] {
    if (res.status < 200 || res.status >= 300) {
        throw new Error('Bad response status: ' + res.status);
    }
    return (res && res.body && res.body.d.results);
  }
}