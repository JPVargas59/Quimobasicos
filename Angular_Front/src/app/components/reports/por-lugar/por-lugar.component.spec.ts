import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PorLugarComponent } from './por-lugar.component';

describe('PorLugarComponent', () => {
  let component: PorLugarComponent;
  let fixture: ComponentFixture<PorLugarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PorLugarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PorLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
