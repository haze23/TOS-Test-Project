import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalBillingComponent } from './additional-billing.component';

describe('AdditionalBillingComponent', () => {
  let component: AdditionalBillingComponent;
  let fixture: ComponentFixture<AdditionalBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdditionalBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
