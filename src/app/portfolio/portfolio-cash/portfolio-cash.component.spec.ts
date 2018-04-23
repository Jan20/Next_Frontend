import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCashComponent } from './portfolio-cash.component';

describe('PortfolioCashComponent', () => {
  let component: PortfolioCashComponent;
  let fixture: ComponentFixture<PortfolioCashComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioCashComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
