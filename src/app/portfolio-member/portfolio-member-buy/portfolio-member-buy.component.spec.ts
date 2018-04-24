import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMemberBuyComponent } from './portfolio-member-buy.component';

describe('PortfolioMemberBuyComponent', () => {
  let component: PortfolioMemberBuyComponent;
  let fixture: ComponentFixture<PortfolioMemberBuyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioMemberBuyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMemberBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
