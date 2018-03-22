import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component';
import { LoggerService } from './logger.service';
import { BetterLoggerService } from './loggers/better-logger.service';
import { AccountListComponent } from './accounts/account-list/account-list.component';


@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [{provide: LoggerService, useClass: BetterLoggerService}],
  bootstrap: [AppComponent]
})
export class AppModule { }