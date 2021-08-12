import { TestBed } from '@angular/core/testing';

import { PaymentTypeServiceService } from './payment-type-service.service';

describe('PaymentTypeServiceService', () => {
  let service: PaymentTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PaymentTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
