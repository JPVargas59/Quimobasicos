import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitTankComponent } from './exit-tank.component';

describe('ExitTankComponent', () => {
  let component: ExitTankComponent;
  let fixture: ComponentFixture<ExitTankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExitTankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitTankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
