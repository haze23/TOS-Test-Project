import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDeptsListComponent } from './employee-depts-list.component';

describe('EmployeeDeptsListComponent', () => {
  let component: EmployeeDeptsListComponent;
  let fixture: ComponentFixture<EmployeeDeptsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDeptsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDeptsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
