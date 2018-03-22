import { Component, Inject, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { fromJS, List } from 'immutable';

import { AccountService } from './accounts/account.service';
import { Account } from './account';
import { LoggerService } from './logger.service';

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
  @ViewChild('accountForm') form: NgForm;

  accounts: Array<Account> = [];
  accountService: AccountService;

  constructor(private cd: ChangeDetectorRef, private logger: LoggerService) {
    this.account = {username: '', password: ''};
  }

  addAccount(user) {
    this.logger.log(user.form.value);

    this.accounts.push(fromJS(user.form.value));
  }

}
