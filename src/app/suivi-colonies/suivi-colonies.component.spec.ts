import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuiviColoniesComponent } from './suivi-colonies.component';

describe('SuiviColoniesComponent', () => {
  let component: SuiviColoniesComponent;
  let fixture: ComponentFixture<SuiviColoniesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SuiviColoniesComponent]
    });
    fixture = TestBed.createComponent(SuiviColoniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
