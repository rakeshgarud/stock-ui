import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntraDayComponent } from './intra-day.component';

describe('IntraDayComponent', () => {
  let component: IntraDayComponent;
  let fixture: ComponentFixture<IntraDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntraDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntraDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
