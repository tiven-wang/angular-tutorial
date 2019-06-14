import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

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

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductAlertsComponent
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
