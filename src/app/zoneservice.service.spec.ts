import { TestBed } from '@angular/core/testing';

import { ZoneserviceService } from './zoneservice.service';

describe('ZoneserviceService', () => {
  let service: ZoneserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZoneserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
