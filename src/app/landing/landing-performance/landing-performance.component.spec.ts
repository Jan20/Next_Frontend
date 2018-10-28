import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPerformanceComponent } from './landing-performance.component';

describe('LandingPerformanceComponent', () => {
  let component: LandingPerformanceComponent;
  let fixture: ComponentFixture<LandingPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
