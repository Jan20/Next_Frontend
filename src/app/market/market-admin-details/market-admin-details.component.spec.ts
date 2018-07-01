import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketAdminDetailsComponent } from './market-admin-details.component';

describe('ProjectDetailsComponent', () => {
  let component: MarketAdminDetailsComponent;
  let fixture: ComponentFixture<MarketAdminDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarketAdminDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketAdminDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
