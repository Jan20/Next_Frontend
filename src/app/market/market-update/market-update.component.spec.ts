import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketUpdateComponent } from './market-update.component';

describe('MarketUpdateComponent', () => {
  let component: MarketUpdateComponent;
  let fixture: ComponentFixture<MarketUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
