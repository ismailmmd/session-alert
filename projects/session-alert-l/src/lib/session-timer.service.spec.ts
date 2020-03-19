import { TestBed, fakeAsync, tick, discardPeriodicTasks } from '@angular/core/testing';

import { SessionTimerService, SESSION_TIMER_CONFIG } from './session-timer.service';

/**
 * SUITE 1
 */
describe('SessionTimerService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SessionTimerService,
        { provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 1, sessionTime: 2 } }
      ]
    });
  });

  it('should be created', () => {
    const service: SessionTimerService = TestBed.get(SessionTimerService);
    expect(service).toBeTruthy();
  });

  it('should start timer and complete', fakeAsync(
    () => {
      const service: SessionTimerService = TestBed.get(SessionTimerService);
      service.startTimer();
      let val;
      service.timeoutExpired.subscribe(res => val = res);
      tick(1000 * 60);
      expect(val).toBe(1);
    }
  ));

  it('should start timer and reset', fakeAsync(
    () => {
      const service: SessionTimerService = TestBed.get(SessionTimerService);
      let val;
      service.startTimer();
      service.timeoutExpired.subscribe(res => val = res);
      tick(1000 * 60);
      expect(val).toBe(1);
      service.resetTimer();
      tick(1000 * 60);
      expect(val).toBe(1);
    }
  ));

  it('should start timer and stop', fakeAsync(
    () => {
      const service: SessionTimerService = TestBed.get(SessionTimerService);
      service.startTimer();
      let val;
      service.timeoutExpired.subscribe(res => val = res);
      tick(1000 * 60);
      expect(val).toBe(1);
      service.stopTimer();
      tick(1000 * 60);
      expect(val).toBe(1);
    }
  ));

  it('counter should work', fakeAsync(
    () => {
      const service: SessionTimerService = TestBed.get(SessionTimerService);
      let received: number | undefined;
      service.startTimer();
      tick(1000 * 60);
      service.countDownObs.subscribe(value => received = value);
      tick(0);
      expect(received).toEqual(60 * 1000);
      tick(1000);
      expect(received).toEqual(59 * 1000);
      discardPeriodicTasks();
    }
  ));
});

/**
 * SUITE 2
 */
describe('Invalid SessionTimerService', () => {

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      SessionTimerService,
      { provide: SESSION_TIMER_CONFIG, useValue: { countDownTime: 2, sessionTime: 1 } }
    ]
  }));

  it('should throw exception', () => {
    try {
      TestBed.get(SessionTimerService);
    } catch (error) {
      console.log(error);
      expect(error.message).toContain('Invalid Session Timer Configuration');
    }
  });
});
