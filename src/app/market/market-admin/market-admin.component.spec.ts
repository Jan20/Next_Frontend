import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAdminComponent } from './market-admin.component';

describe('MarketOverviewComponent', () => {
  let component: MarketAdminComponent;
  let fixture: ComponentFixture<MarketAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
