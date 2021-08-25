import { TestBed } from '@angular/core/testing';

import { YFinanceService } from './yfinance.service';

describe('YFinanceService', () => {
  let service: YFinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YFinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
