import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuoteUpdateComponent } from './quote-update.component';

describe('QuoteUpdateComponent', () => {
  let component: QuoteUpdateComponent;
  let fixture: ComponentFixture<QuoteUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuoteUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuoteUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
