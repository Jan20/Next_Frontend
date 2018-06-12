import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentumPerformanceComponent } from './momentum-performance.component';

describe('MomentumPerformanceComponent', () => {
  let component: MomentumPerformanceComponent;
  let fixture: ComponentFixture<MomentumPerformanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentumPerformanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentumPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
