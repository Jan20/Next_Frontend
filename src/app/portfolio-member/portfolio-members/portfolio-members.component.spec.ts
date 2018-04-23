import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioMembersComponent } from './portfolio-members.component';

describe('PortfolioMembersComponent', () => {
  let component: PortfolioMembersComponent;
  let fixture: ComponentFixture<PortfolioMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
