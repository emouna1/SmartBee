import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionRecoltesComponent } from './gestion-recoltes.component';

describe('GestionRecoltesComponent', () => {
  let component: GestionRecoltesComponent;
  let fixture: ComponentFixture<GestionRecoltesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionRecoltesComponent]
    });
    fixture = TestBed.createComponent(GestionRecoltesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
