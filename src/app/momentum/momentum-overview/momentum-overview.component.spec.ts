import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentumOverviewComponent } from './momentum-overview.component';

describe('MomentumOverviewComponent', () => {
  let component: MomentumOverviewComponent;
  let fixture: ComponentFixture<MomentumOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentumOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentumOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
