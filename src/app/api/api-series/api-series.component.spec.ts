import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiSeriesComponent } from './api-series.component';

describe('ApiSeriesComponent', () => {
  let component: ApiSeriesComponent;
  let fixture: ComponentFixture<ApiSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApiSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
