import { TestBed } from '@angular/core/testing';

import { CurrentstocksService } from './currentstocks.service';

describe('CurrentstocksService', () => {
  let service: CurrentstocksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentstocksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
