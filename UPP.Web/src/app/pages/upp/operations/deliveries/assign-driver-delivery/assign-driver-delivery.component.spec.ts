import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignDriverDeliveryComponent } from './assign-driver-delivery.component';

describe('AssignDriverDeliveryComponent', () => {
  let component: AssignDriverDeliveryComponent;
  let fixture: ComponentFixture<AssignDriverDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignDriverDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignDriverDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
