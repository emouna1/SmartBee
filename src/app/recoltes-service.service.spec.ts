import { TestBed } from '@angular/core/testing';

import { RecoltesServiceService } from './recoltes-service.service';

describe('RecoltesServiceService', () => {
  let service: RecoltesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecoltesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
