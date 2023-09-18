import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRuchesComponent } from './gestion-ruches.component';

describe('GestionRuchesComponent', () => {
  let component: GestionRuchesComponent;
  let fixture: ComponentFixture<GestionRuchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRuchesComponent]
    });
    fixture = TestBed.createComponent(GestionRuchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
