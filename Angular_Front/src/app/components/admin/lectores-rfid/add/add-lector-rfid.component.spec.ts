import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLectorRfidComponent } from './add-lector-rfid.component';

describe('AddComponent', () => {
  let component: AddLectorRfidComponent;
  let fixture: ComponentFixture<AddLectorRfidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLectorRfidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLectorRfidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
