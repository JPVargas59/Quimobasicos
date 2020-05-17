import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RfidTagsComponent } from './rfid-tags.component';

describe('RfidTagsComponent', () => {
  let component: RfidTagsComponent;
  let fixture: ComponentFixture<RfidTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RfidTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RfidTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
