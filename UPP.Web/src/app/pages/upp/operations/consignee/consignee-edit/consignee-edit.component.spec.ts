import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigneeEditComponent } from './consignee-edit.component';

describe('ConsigneeEditComponent', () => {
  let component: ConsigneeEditComponent;
  let fixture: ComponentFixture<ConsigneeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsigneeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsigneeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
