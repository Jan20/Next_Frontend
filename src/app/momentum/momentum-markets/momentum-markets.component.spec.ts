import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentumMarketsComponent } from './momentum-markets.component';

describe('MomentumMarketsComponent', () => {
  let component: MomentumMarketsComponent;
  let fixture: ComponentFixture<MomentumMarketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentumMarketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentumMarketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
