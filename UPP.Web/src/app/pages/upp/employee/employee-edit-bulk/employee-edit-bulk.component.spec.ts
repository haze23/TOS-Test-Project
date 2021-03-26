import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeEditBulkComponent } from './employee-edit-bulk.component';

describe('EmployeeEditBulkComponent', () => {
  let component: EmployeeEditBulkComponent;
  let fixture: ComponentFixture<EmployeeEditBulkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeEditBulkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeEditBulkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
