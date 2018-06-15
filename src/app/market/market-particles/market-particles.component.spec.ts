import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketParticlesComponent } from './market-particles.component';

describe('MarketParticlesComponent', () => {
  let component: MarketParticlesComponent;
  let fixture: ComponentFixture<MarketParticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketParticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketParticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
