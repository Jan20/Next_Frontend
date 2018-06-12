import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingParticlesComponent } from './landing-particles.component';

describe('LandingParticlesComponent', () => {
  let component: LandingParticlesComponent;
  let fixture: ComponentFixture<LandingParticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LandingParticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
