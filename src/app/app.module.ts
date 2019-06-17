import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ODataConfiguration, ODataServiceFactory } from "angular-odata-es5";

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductAlertsComponent } from './product-alerts/product-alerts.component';
import { MyODataConfig } from './odata/odata-config.service';
import { ProductService } from './products/product.service';
// UI5 Web Components used
import '@ui5/webcomponents/dist/Button';
import "@ui5/webcomponents/dist/ShellBar";
import "@ui5/webcomponents/dist/TabContainer"; 
import "@ui5/webcomponents/dist/Tab";
import "@ui5/webcomponents/dist/TabSeparator";
import "@ui5/webcomponents/dist/Table";

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
    ODataServiceFactory,
    ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
