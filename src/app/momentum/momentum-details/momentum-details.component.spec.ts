import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MomentumDetailsComponent } from './momentum-details.component';

describe('MomentumDetailsComponent', () => {
  let component: MomentumDetailsComponent;
  let fixture: ComponentFixture<MomentumDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MomentumDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MomentumDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
