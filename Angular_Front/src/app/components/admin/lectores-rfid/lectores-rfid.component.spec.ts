import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LectoresRfidComponent } from './lectores-rfid.component';

describe('LectoresRfidComponent', () => {
  let component: LectoresRfidComponent;
  let fixture: ComponentFixture<LectoresRfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LectoresRfidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LectoresRfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
