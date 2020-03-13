import { TestBed } from '@angular/core/testing';

import { SessionTimerService, SessionTimerConfig, SESSION_TIMER_CONFIG } from './session-timer.service';

describe('SessionTimerService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SessionTimerService,
      { provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 1, sessionTime: 2 } }
    ]
  }));

  it('should be created', () => {
    const service: SessionTimerService = TestBed.get(SessionTimerService);
    expect(service).toBeTruthy();
  });
});
