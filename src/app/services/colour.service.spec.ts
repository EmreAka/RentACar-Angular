import { TestBed } from '@angular/core/testing';

import { ColourService } from './colour.service';

describe('ColourService', () => {
  let service: ColourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
