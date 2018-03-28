import { Component, Inject, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgForm, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { fromJS, List } from 'immutable';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/retry';

import { AccountService } from './accounts/account.service';
import { Account } from './account';
import { LoggerService } from './logger.service';
import { CaptchComponent } from './accounts/captch/captch.component';

@Component({
  selector: 'app-root',
  providers: [AccountService],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  logoUrl = '/assets/logo.svg';

  account: Account;

  accounts: Array<Account> = [];

  captchImage: string;
  captchPostions: string;

  private login$ = Observable.of(1);
  private submit$ = new Subject();

  constructor(private cd: ChangeDetectorRef, private logger: LoggerService, private service: AccountService) {
    this.account = {username: 'xxxxxxxx', password: '********'};

    this.login$.mergeMap(() => this.service.getCaptch())
      .do((image) => {
        this.captchImage = image;
      })
      .switchMap(() => this.submit$)
      .switchMap(() => this.service.checkCaptcha(this.captchPostions))
      .switchMap(() => this.service.login(this.account))
      .retry(100)
      .subscribe(() => {
          console.log('Login successfully!');
        }
        , err => console.error(err)
        , () => console.log('Login flow completed!'));
  }

  onSubmit() {
    this.submit$.next('');
  }

  captchPosition(event) {
    console.log(event);
    this.captchPostions = event;
  }
}
