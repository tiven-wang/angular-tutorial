import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptchComponent } from './captch.component';

describe('CaptchComponent', () => {
  let component: CaptchComponent;
  let fixture: ComponentFixture<CaptchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
