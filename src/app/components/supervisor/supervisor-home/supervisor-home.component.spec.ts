import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorHomeComponent } from './supervisor-home.component';

describe('SupervisorHomeComponent', () => {
  let component: SupervisorHomeComponent;
  let fixture: ComponentFixture<SupervisorHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
