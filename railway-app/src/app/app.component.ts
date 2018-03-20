import { Component, Inject } from '@angular/core';
import { AccountService } from './accounts/account.service';

@Component({
  selector: 'App',
  providers: [AccountService],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular App';
  logoUrl = '/assets/logo.svg';

  account: AccountService

  constructor(account: AccountService) {
    this.account = account;
  }

}
