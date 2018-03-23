import { Component, Inject, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';
import { NgForm, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { fromJS, List } from 'immutable';

import { AccountService } from './accounts/account.service';
import { Account } from './account';
import { LoggerService } from './logger.service';
import { CaptchComponent } from './accounts/captch/captch.component';

@Component({
  selector: 'App',
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

  constructor(private cd: ChangeDetectorRef, private logger: LoggerService, private accountService: AccountService) {
    this.account = {username: '', password: ''};
    this.accountService
      .login()
      .subscribe(image=> {
        this.captchImage = image;
      });
  }

  addAccount(user) {
    this.logger.log(user.form.value);
    this.accountService.checkCaptcha(this.captchPostions)
      .subscribe(body=> {
        console.log(body);
      })
    this.accounts.push(fromJS(user.form.value));
  }

  captchPosition(event) {
    console.log(event);
    this.captchPostions = event;
  }
}
