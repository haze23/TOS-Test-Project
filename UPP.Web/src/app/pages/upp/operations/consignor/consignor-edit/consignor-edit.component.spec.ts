import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsignorEditComponent } from './consignor-edit.component';

describe('ConsignorEditComponent', () => {
  let component: ConsignorEditComponent;
  let fixture: ComponentFixture<ConsignorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsignorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsignorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
