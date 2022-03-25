import { TestBed } from '@angular/core/testing';

import { FuelService } from './fuel.service';

describe('FuelService', () => {
  let service: FuelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
