import { Component, Inject, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { NgForm }                      from '@angular/forms';
import { fromJS, List } from 'immutable';

import { AccountService, Account } from './accounts/account.service';
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

  @Input() account: Account = {name:'User', password:''};
  @ViewChild('accountForm') form: NgForm;

  accounts: Array<Account> = [];
  accountService: AccountService;

  constructor(private cd: ChangeDetectorRef, private logger: LoggerService) {
    
    setTimeout(() => {
      // this.cd.detach();
      this.account.name = 'MyName';
    }, 2000);
  }

  addAccount() {
    this.logger.log(JSON.stringify(this.account));

    this.accounts.push(fromJS(this.account));
  }

}
