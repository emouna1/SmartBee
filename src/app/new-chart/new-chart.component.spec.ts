import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewChartComponent } from './new-chart.component';

describe('NewChartComponent', () => {
  let component: NewChartComponent;
  let fixture: ComponentFixture<NewChartComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewChartComponent]
    });
    fixture = TestBed.createComponent(NewChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
