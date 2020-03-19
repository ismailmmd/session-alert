import { TestBed } from '@angular/core/testing';

import { SessionDialogueService } from './session-dialogue.service';
import { SessionTimerService } from '../session-timer.service';
import { MatDialog } from '@angular/material';
import { of, BehaviorSubject } from 'rxjs';

xdescribe('SessionDialogueService', () => {

  let sessionMockTimer = null;
  let mockMatDilog = null;

  beforeEach(() => {

    sessionMockTimer = jasmine.createSpyObj('SessionTimerService', ['startTimer', 'countDownObs',
      'timeoutExpired', 'resetTimer', 'stopTimer']);
    sessionMockTimer.startTimer.and.returnValue(null);
    sessionMockTimer.timeoutExpired.and.returnValue(of(1));
    sessionMockTimer.resetTimer.and.returnValue(null);
    sessionMockTimer.stopTimer.and.returnValue(null);
    sessionMockTimer.countDownObs.and.returnValue(of(1));

    mockMatDilog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);
    mockMatDilog.open.and.returnValue(null);
    mockMatDilog.afterClosed.and.returnValue(of(true));

    TestBed.configureTestingModule({
      providers: [
        { provide: SessionTimerService, useValue: sessionMockTimer },
        { provide: MatDialog, useValue: mockMatDilog },
        SessionDialogueService
      ]
    });
  });

  it('should be created', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    expect(service).toBeTruthy();
  });

  it('should trigger timer reset on login', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    const loggedIn = new BehaviorSubject<boolean>(false);
    service.initialise(null, loggedIn);
    loggedIn.next(true);
    expect(sessionMockTimer.resetTimer).toHaveBeenCalled();
  });

  it('should trigger timer stop on logout', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    const loggedIn = new BehaviorSubject<boolean>(false);
    service.initialise(null, loggedIn);
    loggedIn.next(false);
    expect(sessionMockTimer.stopTimer).toHaveBeenCalled();
  });

  it('should initialise dailog with modal', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    const loggedIn = new BehaviorSubject<boolean>(false);
    service.initialise(null, loggedIn);
  });

  it('should return counter value', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    // expect(service.getCountDownObs()).
  });
});
