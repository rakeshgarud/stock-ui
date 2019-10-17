import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PremiumDecayComponent } from './premium-decay.component';

describe('PremiumDecayComponent', () => {
  let component: PremiumDecayComponent;
  let fixture: ComponentFixture<PremiumDecayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PremiumDecayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PremiumDecayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
