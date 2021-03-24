import { TestBed } from '@angular/core/testing';
import { EquityService } from './equity.service';


describe('EquityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EquityService = TestBed.get(EquityService);
    expect(service).toBeTruthy();
  });
});
