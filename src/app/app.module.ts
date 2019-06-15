import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ODataConfiguration, ODataServiceFactory, IODataResponseModel } from "angular-odata-es5";
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
// UI5 Web Components used
import '@ui5/webcomponents/dist/Button';
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/TabContainer"; 
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Table";

interface myIODataResponseModel<T> extends IODataResponseModel<T> {
  d: myIODataResults<T>;
}

interface myIODataResults<T> {
  results: T[];
}

@Injectable()
class MyODataConfig extends ODataConfiguration {
    baseUrl=environment.oDataBaseUrl+"/sap/opu/odata/sap/SEPMRA_SO_ANA/"
    
    extractQueryResultData<T>(res: HttpResponse<myIODataResponseModel<T>>): T[] {
      if (res.status < 200 || res.status >= 300) {
          throw new Error('Bad response status: ' + res.status);
      }
      return (res && res.body && res.body.d.results);
    }
}

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductAlertsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    { provide: ODataConfiguration, useClass: MyODataConfig },
    ODataServiceFactory
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
