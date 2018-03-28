import { TestBed, async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { AppComponent } from './app.component';
import { AccountService } from './accounts/account.service';
import { LoggerService } from './logger.service';
import { CaptchComponent } from './accounts/captch/captch.component';
import { AccountListComponent } from './accounts/account-list/account-list.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CaptchComponent,
        AccountListComponent
      ],
      imports: [
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [AccountService, LoggerService]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
    expect(app.account).toBeTruthy();
  }));
  it(`should have as title 'Angular App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Angular App');
  }));
  it('should render title in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Angular App!');
  }));
});
