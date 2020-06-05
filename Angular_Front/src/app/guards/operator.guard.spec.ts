import { TestBed } from '@angular/core/testing';

import { OperatorGuard } from './operator.guard';

describe('OperatorGuard', () => {
  let guard: OperatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(OperatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
