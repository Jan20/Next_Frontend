import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingOverviewComponent } from './landing-overview.component';

describe('LandingOverviewComponent', () => {
  let component: LandingOverviewComponent;
  let fixture: ComponentFixture<LandingOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
