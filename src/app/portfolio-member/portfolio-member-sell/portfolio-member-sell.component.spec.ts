import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMemberSellComponent } from './portfolio-member-sell.component';

describe('PortfolioMemberSellComponent', () => {
  let component: PortfolioMemberSellComponent;
  let fixture: ComponentFixture<PortfolioMemberSellComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioMemberSellComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMemberSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
