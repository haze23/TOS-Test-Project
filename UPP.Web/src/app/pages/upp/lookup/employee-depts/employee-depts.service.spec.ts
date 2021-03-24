import { TestBed } from '@angular/core/testing';

import { EmployeeDeptsService } from './employee-depts.service';

describe('EmployeeDeptsService', () => {
  let service: EmployeeDeptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeDeptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
