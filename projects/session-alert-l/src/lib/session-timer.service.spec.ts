import { TestBed } from '@angular/core/testing';

import { SessionTimerService } from './session-timer.service';

describe('SessionTimerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SessionTimerService = TestBed.get(SessionTimerService);
    expect(service).toBeTruthy();
  });
});
