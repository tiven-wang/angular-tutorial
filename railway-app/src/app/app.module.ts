import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoggerService } from './logger.service';
import { BetterLoggerService } from './loggers/better-logger.service';
import { AccountListComponent } from './accounts/account-list/account-list.component';
import { CaptchComponent } from './accounts/captch/captch.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    CaptchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
  ],
  providers: [{provide: LoggerService, useClass: BetterLoggerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }