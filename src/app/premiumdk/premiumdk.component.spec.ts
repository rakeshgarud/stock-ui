import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumdkComponent } from './premiumdk.component';

describe('PremiumdkComponent', () => {
  let component: PremiumdkComponent;
  let fixture: ComponentFixture<PremiumdkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumdkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumdkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
