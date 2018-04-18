import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioAddAssetComponent } from './portfolio-add-asset.component';

describe('PortfolioAddAssetComponent', () => {
  let component: PortfolioAddAssetComponent;
  let fixture: ComponentFixture<PortfolioAddAssetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioAddAssetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioAddAssetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
