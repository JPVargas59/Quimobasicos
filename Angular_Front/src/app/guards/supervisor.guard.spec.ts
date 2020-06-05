import { TestBed } from '@angular/core/testing';

import { SupervisorGuard } from './supervisor.guard';

describe('SupervisorGuard', () => {
  let guard: SupervisorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SupervisorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
