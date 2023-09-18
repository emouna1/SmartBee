import { TestBed } from '@angular/core/testing';

import { RucheService } from './ruche-service.service';

describe('RucheServiceService', () => {
  let service: RucheService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RucheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
