import { TestBed } from '@angular/core/testing';

import { PlantesMelliferesService } from './plantes-melliferes.service';

describe('PlantesMelliferesService', () => {
  let service: PlantesMelliferesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlantesMelliferesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
