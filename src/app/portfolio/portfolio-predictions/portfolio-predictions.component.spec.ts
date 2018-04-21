import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPredictionsComponent } from './portfolio-predictions.component';

describe('PortfolioPredictionsComponent', () => {
  let component: PortfolioPredictionsComponent;
  let fixture: ComponentFixture<PortfolioPredictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioPredictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioPredictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
