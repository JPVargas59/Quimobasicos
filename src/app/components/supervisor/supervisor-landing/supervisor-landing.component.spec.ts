import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorLandingComponent } from './supervisor-landing.component';

describe('SupervisorLandingComponent', () => {
  let component: SupervisorLandingComponent;
  let fixture: ComponentFixture<SupervisorLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
