import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingBenefitsComponent } from './landing-benefits.component';

describe('LandingBenefitsComponent', () => {
  let component: LandingBenefitsComponent;
  let fixture: ComponentFixture<LandingBenefitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingBenefitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
