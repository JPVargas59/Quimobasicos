import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOwnerComponent } from './edit-owner.component';

describe('EditOwnerComponent', () => {
  let component: EditOwnerComponent;
  let fixture: ComponentFixture<EditOwnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOwnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
