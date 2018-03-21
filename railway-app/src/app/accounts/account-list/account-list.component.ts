import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'account-list',
  template: `
    <div *ngFor="let account of accounts">
      <p>{{account.get('name')}}</p>
    </div>
  `,
  styleUrls: ['./account-list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountListComponent implements OnInit {

  @Input() accounts: Array<Account>;

  constructor() { }

  ngOnInit() {
  }

}
