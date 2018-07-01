import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AssetAdminComponent } from './asset-admin.component';

describe('AssetAdminComponent', () => {
  let component: AssetAdminComponent;
  let fixture: ComponentFixture<AssetAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
