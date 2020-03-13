import { TestBed } from '@angular/core/testing';

import { SessionDialogueService } from './session-dialogue.service';
import { SessionTimerService } from '../session-timer.service';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';

describe('SessionDialogueService', () => {
  beforeEach(() => {

    const sessionMockTimer = jasmine.createSpyObj('SessionTimerService', ['startTimer', 'countDownObs',
   'timeoutExpired', 'resetTimer', 'stopTimer']);
    sessionMockTimer.startTimer.and.returnValue(null);
    sessionMockTimer.timeoutExpired.and.returnValue(of(1));
    sessionMockTimer.resetTimer.and.returnValue(null);
    sessionMockTimer.stopTimer.and.returnValue(null);
    sessionMockTimer.countDownObs.and.returnValue(of(1));

    const mockMatDilog = jasmine.createSpyObj('MatDialog', ['open', 'afterClosed']);
    mockMatDilog.open.and.returnValue(null);
    mockMatDilog.afterClosed.and.returnValue(of(true));

    TestBed.configureTestingModule({
      providers: [
        { provide: SessionTimerService, useValue: sessionMockTimer },
        { provide: MatDialog, useValue: mockMatDilog },
        SessionDialogueService
      ]
    })
  });

  it('should be created', () => {
    const service: SessionDialogueService = TestBed.get(SessionDialogueService);
    expect(service).toBeTruthy();
  });
});
