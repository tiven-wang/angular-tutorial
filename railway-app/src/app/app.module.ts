import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoggerService } from './logger.service';
import { BetterLoggerService } from './loggers/better-logger.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [{provide: LoggerService, useClass: BetterLoggerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }