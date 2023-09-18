import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoneSpeciesComponent } from './zone-species.component';

describe('ZoneSpeciesComponent', () => {
  let component: ZoneSpeciesComponent;
  let fixture: ComponentFixture<ZoneSpeciesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ZoneSpeciesComponent]
    });
    fixture = TestBed.createComponent(ZoneSpeciesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
