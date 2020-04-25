import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateTankComponent } from './update-tank.component';

describe('UpdateTankComponent', () => {
  let component: UpdateTankComponent;
  let fixture: ComponentFixture<UpdateTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
