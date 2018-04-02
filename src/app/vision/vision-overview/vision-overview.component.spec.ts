import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisionOverviewComponent } from './vision-overview.component';

describe('VisionOverviewComponent', () => {
  let component: VisionOverviewComponent;
  let fixture: ComponentFixture<VisionOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisionOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisionOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
