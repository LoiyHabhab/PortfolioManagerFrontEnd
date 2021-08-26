import { TestBed } from '@angular/core/testing';

import { MarketmoversService } from './marketmovers.service';

describe('MarketmoversService', () => {
  let service: MarketmoversService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketmoversService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
