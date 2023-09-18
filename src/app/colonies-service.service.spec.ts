import { TestBed } from '@angular/core/testing';

import { ColoniesServiceService } from './colonies-service.service';

describe('ColoniesServiceService', () => {
  let service: ColoniesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColoniesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
