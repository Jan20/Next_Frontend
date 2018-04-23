import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMemberAddComponent } from './portfolio-member-add.component';

describe('PortfolioMemberAddComponent', () => {
  let component: PortfolioMemberAddComponent;
  let fixture: ComponentFixture<PortfolioMemberAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioMemberAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMemberAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
